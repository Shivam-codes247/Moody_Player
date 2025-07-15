// components/FaceExpressionDetector.jsx

import React, { useRef, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceExpressionDetector = () => {
    const videoRef = useRef(null);

    const startVideo = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
            videoRef.current.srcObject = stream;
            console.log("🎥 Video started");
        } catch (err) {
            console.error("Error accessing camera:", err);
        }
    };

    const loadModels = async () => {
        try {
            const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';

            await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
            await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
            console.log("📦 Models loaded");
        } catch (err) {
            console.error("Model load error:", err);
        }
    };

    async function detect_Mood() {
        if (videoRef.current) {
            const detections = await faceapi
                .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceExpressions();

            if (detections.length > 0) {
                const expressions = detections[0].expressions;
                const maxExpression = Object.entries(expressions).reduce((a, b) =>
                    a[1] > b[1] ? a : b
                );
                console.log("😃 Top Expression:", maxExpression[0], maxExpression[1].toFixed(2));
            } else {
                console.log("😐 No face detected");
            }
        }
    }


    useEffect(() => {


    })

    loadModels().then(startVideo);



    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                overflow: "hidden",
                backgroundColor: "#000",
            }}
        >
            <div style={{ position: "relative", width: "720px", height: "560px" }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted
                    width="720"
                    height="560"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        zIndex: 1,
                        borderRadius: "8px",
                    }}
                />

                {/* ✅ Button on bottom center of video */}
                <button
                    onClick={detect_Mood}
                    style={{
                        position: "absolute",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        padding: "10px 25px",
                        fontSize: "1.2rem",
                        backgroundColor: "black",
                        color: "white",
                        border: "2px solid white",
                        borderRadius: "8px",
                        cursor: "pointer",
                        zIndex: 2,
                    }}
                >
                    Detect Mood
                </button>
            </div>
        </div>
    );



};

export default FaceExpressionDetector;
