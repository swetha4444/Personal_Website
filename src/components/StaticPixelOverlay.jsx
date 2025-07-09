import React, { useRef, useEffect } from "react";

export default function StaticPixelOverlay({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const drawStatic = () => {
      const w = canvas.width;
      const h = canvas.height;
      const imageData = ctx.createImageData(w, h);
      for (let i = 0; i < w * h * 4; i += 4) {
        // More RGB color static
        imageData.data[i] = Math.random() * 255;     // Red
        imageData.data[i + 1] = Math.random() * 255; // Green
        imageData.data[i + 2] = Math.random() * 255; // Blue
        imageData.data[i + 3] = 40 + Math.random() * 80; // Alpha
      }
      ctx.putImageData(imageData, 0, 0);
      animationId = requestAnimationFrame(drawStatic);
    };

    drawStatic();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={180}
      className={`absolute inset-0 w-full h-full opacity-30 pointer-events-none ${className}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}