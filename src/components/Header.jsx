import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  const [hasVisitedDashboard, setHasVisitedDashboard] = useState(false)

  useEffect(() => {
    const visited = localStorage.getItem('hasVisitedDashboard')
    setHasVisitedDashboard(!!visited)
  }, [])

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/" className="brand" style={{ textDecoration: 'none', color: 'inherit' }}>
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
              <path d="M32 8 L20 32 L28 32 L24 56 L44 32 L36 32 L40 8 Z" fill="url(#g1)" opacity="0.9"/>
              <path d="M32 12 L24 28 L28 28 L26 48 L40 28 L36 28 L38 12 Z" fill="url(#g2)" opacity="0.7"/>
              <circle cx="32" cy="32" r="26" stroke="url(#g1)" strokeWidth="2" opacity="0.3"/>
            </svg>
            <h2 className="brand-text">SupplyFinder.AI</h2>
          </Link>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          {hasVisitedDashboard && (
            <Link to="/dashboard">My Workspace</Link>
          )}
          <Link to="/faq">FAQ</Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
