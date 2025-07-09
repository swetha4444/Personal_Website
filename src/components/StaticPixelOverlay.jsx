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
        const shade = Math.random() * 255;
        imageData.data[i] = shade;
        imageData.data[i + 1] = shade + Math.random() * 30;
        imageData.data[i + 2] = shade;
        imageData.data[i + 3] = 30 + Math.random() * 80; // alpha
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