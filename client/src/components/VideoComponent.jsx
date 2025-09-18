import React, { useEffect, useRef, useState } from "react";
import "../styles/VideoComponent.css";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const VideoComponent = ({ onLogEvent, username, allLogs }) => {
  const videoRef = useRef(null);
  const [videoVal, setVideoVal] = useState(true);
  const navigate = useNavigate();
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    if (videoVal) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        let tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    }
  }, [videoVal]);

  useEffect(() => {
    let interval;
    let model;

    const loadModel = async () => {
      model = await cocoSsd.load();
      console.log("Model Loaded successfully");

      videoRef.current.addEventListener("loadeddata", () => {
        interval = setInterval(async () => {
          if (
            videoRef.current &&
            videoRef.current.readyState === 4 &&
            videoRef.current.videoWidth > 0 &&
            videoRef.current.videoHeight > 0
          ) {
            const predictions = await model.detect(videoRef.current);
            const filteredObjects = predictions.filter((pred) =>
              ["cell phone", "book", "laptop", "person"].includes(pred.class)
            );

            onLogEvent(filteredObjects);
          }
        }, 3000);
      });
    };
    loadModel();
    return () => clearInterval(interval);
  }, []);

  const handleLogs = async (reportData) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/logs`, reportData);
      console.log("Report saved2222:", res.data._id);
      navigate("/result-logs", { state: { reportId: res.data._id , username: res.data.candidateName} });
    } catch (err) {
      console.error("Error submitting report:", err);
    }
  };

  const handleFinishInterview = () => {
    setVideoVal(false);

    const duration = `${allLogs.length * 3} seconds`; 
    const suspiciousEvents = allLogs.map((entry) => {
      const [time, data] = entry.split(" - ");
      return {
        timestamp: time,
        detections: JSON.parse(data),
      };
    });

    const reportData = {
      candidateName: username,
      interviewDuration: duration,
      focusLostCount: 0, 
      suspiciousEvents,
      finalIntegrityScore: 100, 
    };

    handleLogs(reportData);
  };

  return (
    <div className="container-video">
      <video ref={videoRef} autoPlay playsInline className="video-player" />
      <button
        className="video-btn"
        onClick={handleFinishInterview}
      >
        Finish Interview
      </button>
    </div>
  );
};

export default VideoComponent;
