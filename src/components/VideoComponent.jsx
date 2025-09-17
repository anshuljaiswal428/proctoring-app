import React, { useEffect, useRef, useState } from "react";
import "../styles/VideoComponent.css";
import { NavLink } from "react-router-dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import "@tensorflow/tfjs";

const VideoComponent = ({ onLogEvent }) => {
  const videoRef = useRef(null);
  const [videoVal, setVideoVal] = useState(true);

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

      // Wait until video metadata is loaded (so width/height > 0)
      videoRef.current.addEventListener("loadeddata", () => {
        interval = setInterval(async () => {
          if (
            videoRef.current &&
            videoRef.current.readyState === 4 && // video is ready
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

  return (
    <div className="container-video">
      <video ref={videoRef} autoPlay playsInline className="video-player" />
      <NavLink
        to="/interview-screen/result-logs"
        className="video-btn"
        onClick={() => setVideoVal(false)}
      >
        Finish Interview
      </NavLink>
    </div>
  );
};

export default VideoComponent;
