import React from "react";
import { useLocation } from "react-router-dom";
import MatrixRain from "../backgrounds/matrixRain";

export default function Layout({ children }) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  return (
    <div className="relative min-h-screen bg-black overflow-hidden z-0">
      {!isHomePage && <MatrixRain />}
      {children}
    </div>
  );
}