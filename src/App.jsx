import React from 'react'
import RequestForm from './components/RequestForm'
import './styles/globals.css'

function App() {
  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-brand">
            <h2>SupplyFinder.AI</h2>
          </div>
          <div className="nav-links">
            <a href="#home">Home</a>
            <a href="#about">About</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <h1 className="hero-title">
            AI-Powered Sourcing for Energy Storage
          </h1>
          <p className="hero-subtitle">
            Transform your complex global supply chain sourcing from weeks to minutes. 
            Our AI-driven platform connects energy storage integrators with verified suppliers worldwide.
          </p>
          <button className="cta-button" onClick={() => document.getElementById('request-form').scrollIntoView({ behavior: 'smooth' })}>
            Submit Your Requirements
          </button>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="pain-points">
        <div className="container">
          <h2 className="section-title">The Challenges</h2>
          <div className="pain-points-grid">
            <div className="pain-point">
              <div className="pain-icon">⏰</div>
              <h3>Time-Consuming Process</h3>
              <p>Traditional sourcing takes weeks of research, calls, and negotiations</p>
            </div>
            <div className="pain-point">
              <div className="pain-icon">🌍</div>
              <h3>Global Complexity</h3>
              <p>Navigating multiple suppliers across different countries and regulations</p>
            </div>
            <div className="pain-point">
              <div className="pain-icon">❓</div>
              <h3>Quality Uncertainty</h3>
              <p>Difficult to verify supplier credentials and product quality remotely</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="steps-grid">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Submit Requirements</h3>
              <p>Tell us your specific energy storage sourcing needs</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>AI Analysis</h3>
              <p>Our AI analyzes your requirements and matches with verified suppliers</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Get Matches</h3>
              <p>Receive curated supplier recommendations within minutes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="request-form" className="request-form-section">
        <div className="container">
          <h2 className="section-title">Get Started Today</h2>
          <p className="section-subtitle">
            Submit your sourcing requirements and let our AI find the perfect suppliers for you
          </p>
          <RequestForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3>SupplyFinder.AI</h3>
              <p>AI-Powered Supply Chain Sourcing</p>
            </div>
            <div className="footer-links">
              <a href="mailto:hello@supplyfinder.ai">Contact Us</a>
              <a href="#privacy">Privacy Policy</a>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 SupplyFinder.AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
