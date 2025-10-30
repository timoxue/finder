import React from 'react'

const Hero = () => {
  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <h1 className="hero-title">Your Intelligent Supply Chain Command Center</h1>
        <p className="hero-subtitle">
          Go beyond sourcing. Monitor market risks, manage supplier relationships, and make data-driven decisions—all in one platform.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a className="btn btn-primary" href="#request-form">Start Your Free Trial</a>
          <a className="btn btn-secondary" href="/sample-report">See a Sample Report</a>
          <a className="btn btn-secondary" href="#request-form">Submit your requirements</a>
        </div>
      </div>
    </section>
  )
}

export default Hero
