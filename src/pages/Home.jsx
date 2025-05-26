import React from "react";
import { useNavigate } from "react-router-dom";
import cloudburstLogo from "../assets/cblogo.png";
import nukkitLogo from "../assets/nxlogo.png";

export default function Home() {
  const navigate = useNavigate();

  const buttonClass =
    "border border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-black px-5 py-2 rounded-md transition font-medium shadow-sm";

  return (
    <section className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center px-4">
      <h1 className="text-4xl font-bold mb-8">Welcome to Open Collaboration</h1>
      <p className="mb-12 text-lg text-gray-600 max-w-xl">
        Select one of the projects below to view downloads and more information.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-col items-center">
          <img
            src={cloudburstLogo}
            alt="Cloudburst Logo"
            className="h-12 w-12 mb-3"
          />
          <button
            onClick={() => navigate("/cloudburst")}
            className={buttonClass}
          >
            Cloudburst Downloads
          </button>
        </div>
        <div className="flex flex-col items-center">
          <img src={nukkitLogo} alt="Nukkit Logo" className="h-12 w-12 mb-3" />
          <button onClick={() => navigate("/nukkit")} className={buttonClass}>
            Nukkit Downloads
          </button>
        </div>
      </div>
    </section>
  );
}
