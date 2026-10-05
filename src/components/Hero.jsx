import React from "react";
import "./Hero.css";
import { FaPlay } from "react-icons/fa";

export default function Hero() {
  return (
    <section className="hero d-flex align-items-center">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          
          {/* Left Side: Text + Buttons */}
          <div className="col-lg-6 hero-text">
            <h1 className="fw-bold mb-3">
              Your Journey to a Better Career Starts Here
            </h1>
            <p className="mb-4 text-muted">
              Build valuable skills, learn at your own pace, and prepare yourself for exciting career opportunities.
            </p>
            <div className="d-flex gap-3">
              <button className="btn btn-primary px-4 py-2">Get Started</button>
              <button className="btn btn-outline-primary px-4 py-2 d-flex align-items-center">
                <FaPlay className="me-2" /> Watch Video
              </button>
            </div>
          </div>


           
          </div>
          </div>

        
    </section>
  );
}
