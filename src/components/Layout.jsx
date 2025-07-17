import React from "react";
import MatrixRain from "../backgrounds/matrixRain";

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden z-0">
      <MatrixRain />
      {children}
    </div>
  );
}