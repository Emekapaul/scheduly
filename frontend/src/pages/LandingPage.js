import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
import creativeImage from "../assets/creative.png";
import responsiveImage from "../assets/responsive.png";
import wellImage from "../assets/well.png";
import cleanImage from "../assets/clean.png";
import flowchartImage from "../assets/flowchart.png";
import nodeexpressImage from "../assets/nodeexpress.png";
import speedImage from "../assets/speed.png";
import animateImage from "../assets/animate.png";

export default function LandingPage() {
  return (
    <div className="landing__container">
      {/* Header */}
      <div className="landing__header">
        <div className="landing__header__text">
          <h1>
            Scheduly <br />
            Specially Manages <span className="landing__head__color"> Events, Schedule Events </span> & <br />
            <span className="landing__head__color"> WorkFlow</span>
          </h1>
          <p>
            Built for personal use, small business owners, entrepreneurs, freelancers, and startups.
          </p>
        </div>
      </div>
      {/* End Header */}

      {/* Main */}
      <div className="landing__main">
        <div className="landing__main__header">
          <h1>Core Features</h1>
          <p>Explore some of the salient features of Scheduly. Carefully crafted</p>
          <p>to make your project beautiful and functional</p>
        </div>
        <div className="landing__zone landing__grid-wrapper">
          <div className="landing__box landing__zone">
            <img src={creativeImage} alt="Creative Design" />
            <p>Creative Design</p>
          </div>
          <div className="landing__box landing__zone">
            <img src={responsiveImage} alt="Fully Responsive" />
            <p>Fully Responsive</p>
          </div>
          <div className="landing__box landing__zone">
            <img src={wellImage} alt="Well Documented" />
            <p>Well Documented</p>
          </div>
          <div className="landing__box landing__zone">
            <img src={cleanImage} alt="Clean and Quality Code" />
            <p>Clean and Quality Code</p>
          </div>
          <div className="landing__box landing__zone">
            <img src={flowchartImage} alt="A Process Flow Diagram" />
            <p>A Process Flow Diagram</p>
          </div>
          <div className="landing__box landing__zone">
            <img src={nodeexpressImage} alt="Node and Express Js" />
            <p>Node and Express Js</p>
          </div>
          <div className="landing__box landing__zone">
            <img src={speedImage} alt="Speed Optimized" />
            <p>Speed Optimized</p>
          </div>
          <div className="landing__box landing__zone">
            <img src={animateImage} alt="Creative and Animate CSS" />
            <p>Creative and Animate CSS</p>
          </div>
        </div>
      </div>
      {/* End Main */}

      {/* Footer */}
      <div className="landing__footer">
        <div className="landing__footer_container">
          <h1>Scheduly Is All Prepared To Use. Get Started Immediately!</h1>
          <p>Get onboard today</p>
          <div className="explore_button">
            <Link to="/login">Login</Link>{'/'}
            <Link to="/register">Signup</Link>
          </div>
        </div>
      </div>
      {/* End Footer */}
    </div>
  );
}
