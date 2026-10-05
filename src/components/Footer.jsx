import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer bg-primary text-white pt-5 pb-3">
      <div className="container">
        <div className="row">

          {/* Platform Links */}
          <div className="col-md-2">
            <h5 className="fw-bold mb-3">Platform</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Course Links */}
          <div className="col-md-2">
            <h5 className="fw-bold mb-3">Courses</h5>
            <ul className="list-unstyled">
              <li><a href="#">All Courses</a></li>
              <li><a href="#">Categories</a></li>
              <li><a href="#">Popular</a></li>
              <li><a href="#">New</a></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-md-2">
            <h5 className="fw-bold mb-3">Support</h5>
            <ul className="list-unstyled">
              <li><a href="#">Help Center</a></li>
              <li><a href="#">FAQs</a></li>
              <li><a href="#">Community</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-md-2">
            <h5 className="fw-bold mb-3">Legal</h5>
            <ul className="list-unstyled">
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex gap-3">
              <a href="#"><FaFacebook /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedin /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>

        </div>

        {/* Bottom line */}
        <div className="text-center mt-4 border-top pt-3">
          <small>© 2026 All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
