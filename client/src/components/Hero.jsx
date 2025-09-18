import React, { useState } from "react";
import "../styles/Hero.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="landing-page">
            {/* Header */}
            <header className="header">
                <div className="header-container">
                    {/* Logo */}
                    <div className="logo">
                        <NavLink to="/" >
                            <span style={{ color: "whitesmoke" }}>PROCTOR INTERVIEW</span>
                        </NavLink>
                    </div>

                    {/* Mobile toggle */}
                    <div className="mobile-toggle">
                        <button
                            type="button"
                            className="toggle-btn"
                            onClick={() => setExpanded(!expanded)}
                            aria-expanded={expanded}
                        >
                            {!expanded ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    width="28"
                                    height="28"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    width="28"
                                    height="28"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Desktop nav */}
                    <nav className="nav-desktop">
                        <NavLink to="/interview-screen" className="nav-link">
                            Start Interview
                        </NavLink>
                    </nav>
                </div>

                {/* Mobile nav */}
                {expanded && (
                    <nav className="nav-mobile">
                        <NavLink to="/interview-screen" className="nav-link">
                            Start Interview
                        </NavLink>
                    </nav>
                )}
            </header>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <div className="hero-text">
                        <p className="hero-subtitle">
                            Ensure fair, distraction-free, and secure virtual interviews with real-time AI focus & object detection.
                        </p>
                        <h1 className="hero-title">
                            <span className="gradient-text">Smart Video Proctoring </span> for Online Interviews
                        </h1>
                        <h1 className="hero-description">
                            Why Choose Our Proctoring App?
                        </h1>
                        <p className="hero-description">
                            🎥 Real-time Focus Tracking - Detects when a candidate looks away for more than 5 seconds.
                        </p>
                        <p className="hero-description">
                            👤 Face Presence Detection - Flags absence if no face is detected for over 10 seconds.
                        </p>
                        <p className="hero-description">
                            📱 Suspicious Item Detection - Identifies phones, books, and other devices in the video feed.
                        </p>
                        <p className="hero-description">
                            🧑‍🤝‍🧑 Multiple Faces Detection - Alerts if more than one person is present.
                        </p>
                        <p className="hero-description">
                            📊 Proctoring Reports - Generates detailed reports with timestamps, events, and an integrity score.
                        </p>
                        <p className="hero-description">
                            🔔 Instant Alerts - Optional real-time notifications for interviewers.
                        </p>
                        <NavLink to="/interview-screen" className="hero-btn">
                            Start Interview
                        </NavLink>

                        <div className="hero-stats">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                strokeWidth="1.5"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 7H21M21 7V15M21 7L13 15L9 11L3 17"
                                    stroke="url(#a)"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <defs>
                                    <linearGradient
                                        id="a"
                                        x1="3"
                                        y1="7"
                                        x2="22"
                                        y2="12"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop offset="0%" stopColor="cyan" />
                                        <stop offset="100%" stopColor="purple" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            <span>Make Every Online Interview Fair & Reliable</span>
                        </div>
                    </div>

                    <div className="hero-image">
                        <img
                            src="https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png"
                            alt="Hero Illustration"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
