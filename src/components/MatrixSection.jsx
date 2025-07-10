import React from "react";
import NavBar from "./Navbar"; // Adjust the path if needed

export default function MatrixSection({ children, className = "", ...props }) {
  return (
    <section
      className={
        "bg-black/70 border border-[#5dff4e]/30 rounded-xl shadow-lg " +
        className
      }
      {...props}
    >
      <NavBar />
      {children}
    </section>
  );
}