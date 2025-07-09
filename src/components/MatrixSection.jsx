import React from "react";

export default function MatrixSection({ children, className = "", ...props }) {
  return (
    <section
      className={
        "bg-black/70 border border-[#5dff4e]/30 rounded-xl p-8 mt-24 shadow-lg max-w-xl mx-auto " +
        className
      }
      {...props}
    >
      {children}
    </section>
  );
}