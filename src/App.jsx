import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import RequestForm from './components/RequestForm'
import FAQPage from './components/FAQPage'
import SampleReportPage from './components/SampleReportPage'
import './styles/globals.css'

// Navigation Component
const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <a href="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
            <svg className="brand-icon" width="40" height="40" viewBox="0 0 64 64" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="g1" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#22d3ee"/>
                  <stop offset="100%" stopColor="#2563eb"/>
                </linearGradient>
                <linearGradient id="g2" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fbbf24"/>
                  <stop offset="100%" stopColor="#f59e0b"/>
                </linearGradient>
              </defs>
              {/* Energy lightning bolt */}
              <path d="M32 8 L20 32 L28 32 L24 56 L44 32 L36 32 L40 8 Z" fill="url(#g1)" opacity="0.9"/>
              <path d="M32 12 L24 28 L28 28 L26 48 L40 28 L36 28 L38 12 Z" fill="url(#g2)" opacity="0.7"/>
              <circle cx="32" cy="32" r="26" stroke="url(#g1)" strokeWidth="2" opacity="0.3"/>
            </svg>
            <h2 className="brand-text">SupplyFinder.AI</h2>
          </a>
        </div>
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/faq">FAQ</a>
        </div>
      </div>
    </nav>
  )
}

// Home Page Component
const HomePage = () => {
  return (
    <>
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
          <div className="hero-cta-group">
            <button className="cta-button secondary" onClick={() => window.location.href = '/sample-report'}>
              See a Sample Report
            </button>
            <button className="cta-button primary" onClick={() => document.getElementById('request-form').scrollIntoView({ behavior: 'smooth' })}>
              Submit Your Requirements
            </button>
          </div>
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

      {/* FAQ Promotional Section */}
      <section className="faq-promo">
        <div className="container">
          <div className="faq-promo-card">
            <div className="faq-promo-content">
              <h2 className="faq-promo-title">Have Questions? We Have Answers.</h2>
              <p className="faq-promo-text">
                Get detailed information on how our AI sourcing process works, data confidentiality,
                delivery times, and more in our comprehensive FAQ section.
              </p>
            </div>
            <div className="faq-promo-cta">
              <Link to="/faq" className="faq-promo-button">Visit Our Help Center</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Request Form Section */}
      <section id="request-form" className="request-form-section">
        <div className="container">
          <h2 className="section-title">Get Your Free Sourcing Analysis</h2>
          <p className="section-subtitle">
            No obligation. Receive a customized supplier shortlist report within 24 hours.
          </p>
          <RequestForm />
        </div>
      </section>
    </>
  )
}

// Footer Component
const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>SupplyFinder.AI</h3>
            <p>AI-Powered Supply Chain Sourcing</p>
          </div>
          <div className="footer-links">
            <a href="mailto:hello@supplyfinder.ai">Contact Us</a>
            <a href="/faq">FAQ</a>
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="social-proof">Trusted by early-adopter integrators across Europe and North America.</p>
          <p>&copy; 2024 SupplyFinder.AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

function App() {
  const ScrollToTop = () => {
    const { pathname } = useLocation()
    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, [pathname])
    return null
  }

  // Handle hash scrolling
  useEffect(() => {
    const handleHashScroll = () => {
      if (window.location.hash) {
        const element = document.getElementById(window.location.hash.substring(1))
        if (element) {
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 100)
        }
      }
    }

    // Handle initial load with hash
    handleHashScroll()

    // Handle hash changes
    window.addEventListener('hashchange', handleHashScroll)
    
    return () => {
      window.removeEventListener('hashchange', handleHashScroll)
    }
  }, [])
  return (
    <Router>
      <div className="app">
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/sample-report" element={<SampleReportPage />} />
        </Routes>
        <Footer />
        <Analytics />
      </div>
    </Router>
  )
}

export default App
