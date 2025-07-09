import React from "react";

/**
 * MatrixBoxTV - A boxy, green, retro TV frame component.
 * Children are rendered as the TV "screen" content.
 */
export default function MatrixBoxTV({ children, style, ...props }) {
  return (
    <div
      className="relative w-full h-[420px] flex items-center justify-center"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "60% 40%",
        ...style,
      }}
      {...props}
    >
      <div
        className="relative"
        style={{
          transform: "rotateY(-14deg) rotateX(4deg) scale(1.02)",
          transition: "transform 0.3s cubic-bezier(.4,2,.6,1)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Outer chunky green box frame */}
        <div className="absolute inset-0 rounded-[1.2rem] border-[22px] border-[#1b4d2e] bg-gradient-to-b from-[#1b4d2e] to-[#0d2e1b] shadow-[0_0_120px_#5dff4e55] z-0" />
        {/* Inner green bezel */}
        <div className="absolute inset-4 rounded-[0.8rem] border-[10px] border-[#35984c] bg-gradient-to-b from-[#5dff4e] to-[#0a6129] z-0" />
        {/* TV Inner Bezel */}
        <div className="absolute inset-10 rounded-[0.5rem] border-4 border-[#5dff4e] bg-[#0d2e1b] z-0" />
        {/* TV Glass Reflection */}
        <div
          className="absolute inset-12 rounded-[0.3rem] pointer-events-none z-10"
          style={{
            background: "linear-gradient(120deg, #fff2 10%, #fff1 30%, transparent 70%)",
            opacity: 0.18,
            mixBlendMode: "screen",
          }}
        />
        {/* TV Stand */}
        <div className="absolute bottom-[-36px] left-1/2 -translate-x-1/2 w-36 h-8 bg-[#1b4d2e] rounded-b-lg shadow-lg z-0 border-t-4 border-[#59b941]" />
        {/* TV Screen (children) */}
        <div className="absolute inset-16 rounded-[0.2rem] overflow-hidden flex items-center justify-center z-20 bg-black border-2 border-[#5dff4e]">
          {children}
        </div>
      </div>
    </div>
  );
}