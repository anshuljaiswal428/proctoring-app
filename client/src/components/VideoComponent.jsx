import React, { useEffect, useRef, useState } from "react";
import "../styles/VideoComponent.css";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { FaceMesh } from "@mediapipe/face_mesh";
import { Camera } from "@mediapipe/camera_utils";

const VideoComponent = ({ onLogEvent, username, allLogs, setFocus }) => {
  const videoRef = useRef(null);
  const cameraRef = useRef(null);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [focusLostCount, setFocusLostCount] = useState(0);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (videoEnabled) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      });
    } else {
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [videoEnabled]);

  useEffect(() => {
    let intervalCoco, intervalFaceMesh;
    let cocoModel, faceMesh;

    const loadModels = async () => {
      cocoModel = await cocoSsd.load();

      faceMesh = new FaceMesh({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
      });

      faceMesh.setOptions({
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      faceMesh.onResults((results) => {
        if (!results.multiFaceLandmarks?.length) return;

        const landmarks = results.multiFaceLandmarks[0];
        const leftIris = landmarks[468];
        const rightIris = landmarks[473];
        const leftEyeLeft = landmarks[33];
        const leftEyeRight = landmarks[133];
        const leftEyeTop = landmarks[159];
        const leftEyeBottom = landmarks[145];
        const rightEyeLeft = landmarks[362];
        const rightEyeRight = landmarks[263];

        const leftRatio = (leftIris.x - leftEyeLeft.x) / (leftEyeRight.x - leftEyeLeft.x);
        const rightRatio = (rightIris.x - rightEyeLeft.x) / (rightEyeRight.x - rightEyeLeft.x);
        const verticalRatio = (leftIris.y - leftEyeTop.y) / (leftEyeBottom.y - leftEyeTop.y);

        let gaze = "Center";
        if (leftRatio < 0.35 && rightRatio < 0.35) gaze = "Looking Right";
        else if (leftRatio > 0.65 && rightRatio > 0.65) gaze = "Looking Left";
        else if (verticalRatio < 0.35) gaze = "Looking Up";
        else if (verticalRatio > 0.65) gaze = "Looking Down";

        if (gaze !== "Center") {
          setFocusLostCount((prev) => {
            const updated = prev + 1;
            setFocus(updated);
            return updated;
          });
        }
      });

      cameraRef.current = new Camera(videoRef.current, {
        onFrame: async () => {},
        width: 640,
        height: 480,
      });
      cameraRef.current.start();

      intervalCoco = setInterval(async () => {
        if (videoRef.current?.readyState === 4) {
          const predictions = await cocoModel.detect(videoRef.current);

          const personDetected = predictions.some((pred) => pred.class === "person");
          const suspiciousObjects = predictions.filter((pred) => pred.class !== "person");

          if (!personDetected || suspiciousObjects.length > 0) {
            setFocusLostCount((prev) => {
              const updated = prev + suspiciousObjects.length + (!personDetected ? 1 : 0);
              setFocus(updated);
              return updated;
            });
          }

          const filteredObjects = predictions.filter((pred) =>
            ["cell phone", "book", "laptop", "person"].includes(pred.class)
          );
          onLogEvent(filteredObjects);
        }
      }, 1000);

      intervalFaceMesh = setInterval(async () => {
        if (videoRef.current?.readyState === 4) {
          await faceMesh.send({ image: videoRef.current });
        }
      }, 1000);
    };

    loadModels();

    return () => {
      clearInterval(intervalCoco);
      clearInterval(intervalFaceMesh);

      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }

      if (cameraRef.current) {
        cameraRef.current.stop();
        cameraRef.current = null;
      }
    };
  }, []);

  const handleFinish = async () => {
    setVideoEnabled(false);

    const duration = `${allLogs.length * 3} seconds`;
    const suspiciousEvents = allLogs.map((entry) => {
      const [time, data] = entry.split(" - ");
      let detections = [];
      try {
        detections = JSON.parse(data);
      } catch (err) {
        console.error("Invalid JSON log", err);
      }
      return { timestamp: time, detections };
    });

    const reportDataToSend = {
      candidateName: username || "Unknown",
      interviewDuration: duration,
      focusLostCount,
      suspiciousEvents,
      finalIntegrityScore: Math.max(0, 100 - focusLostCount),
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/logs`, reportDataToSend);

      const safeData = res?.data || {
        _id: "unknown",
        candidateName: username || "Unknown",
      };

      navigate("/result-logs", {
        state: { reportId: safeData._id, username: safeData.candidateName },
      });
    } catch (err) {
      console.error("Error submitting report:", err);

      navigate("/result-logs", {
        state: { reportId: "unknown", username: username || "Unknown" },
      });
    }
  };

  return (
    <div className="container-video">
      <video ref={videoRef} autoPlay playsInline className="video-player" />
      <button className="video-btn" onClick={handleFinish}>
        Finish Interview
      </button>
    </div>
  );
};

export default VideoComponent;
