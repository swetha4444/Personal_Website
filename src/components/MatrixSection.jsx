import React from "react";

export default function MatrixSection({ children, className = "", ...props }) {
  return (
    <section
      className={
        "bg-black/70 border border-[#5dff4e]/30 rounded-xl shadow-lg " +
        className
      }
      {...props}
    >
      {children}
    </section>
  );
}