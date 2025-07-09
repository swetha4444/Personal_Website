import React from "react";
import MatrixSection from "../components/MatrixSection";

export default function Projects() {
  return (
    <main className="relative z-10 flex flex-col items-center justify-center min-h-screen">
      <MatrixSection className="max-w-2xl">
        <h1 className="text-3xl font-extrabold text-[#5dff4e] mb-6 text-center matrix-font">
          Projects
        </h1>
        <p className="text-green-200 text-lg text-center font-mono">
          {/* List your projects here */}
          Coming soon...
        </p>
      </MatrixSection>
    </main>
  );
}