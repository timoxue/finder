import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TrendBadge = ({ trend, children }) => {
  const cls = trend === 'up' ? 'trend-badge trend-up' : trend === 'down' ? 'trend-badge trend-down' : 'trend-badge trend-neutral'
  return <span className={cls}>{children}</span>
}

const SectionCard = ({ title, children, action }) => (
  <section className="how-it-works" style={{ paddingTop: 40, paddingBottom: 40 }}>
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <h2 className="section-title" style={{ marginBottom: 0 }}>{title}</h2>
        {action}
      </div>
      {children}
    </div>
  </section>
)

const iconFor = (label) => {
  if (label.includes('Lithium')) return '🪫'
  if (label.includes('Port')) return '🚢'
  if (label.includes('Policy')) return '📜'
  return '📈'
}

const Dashboard = () => {
  const [intel, setIntel] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadIntel = async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch('/api/market-intelligence')
      if (!res.ok) throw new Error('Failed to load intelligence')
      const data = await res.json()
      setIntel({
        list: [
          { label: 'Lithium Carbonate Price', value: `${data.lithium_price.value}/ton`, trend: data.lithium_price.trend, change: `${data.lithium_price.change} this week` },
          { label: 'EU Port Congestion', value: data.shipping_delay.value, trend: data.shipping_delay.trend, change: `${data.shipping_delay.change} avg delay` },
          { label: 'Policy Watch', value: data.policy_alert.value, trend: data.policy_alert.trend, change: data.policy_alert.change },
        ]
      })
    } catch (e) {
      setError('Unable to refresh market data, showing last known snapshot.')
      setIntel({
        list: [
          { label: 'Lithium Carbonate Price', value: '¥105,500/ton', trend: 'down', change: '-2.3% this week' },
          { label: 'EU Port Congestion', value: 'Moderate', trend: 'neutral', change: '+3 days avg delay' },
          { label: 'Policy Watch', value: 'Germany', trend: 'up', change: 'New subsidy draft released' },
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadIntel()
  }, [])

  // Mark that user has visited the dashboard to enable contextual nav
  useEffect(() => {
    try {
      localStorage.setItem('hasVisitedDashboard', 'true')
    } catch (_) {
      // ignore
    }
  }, [])

  const projects = [
    { name: 'German C&I Project', date: '2024-01-15', suppliers: ['Supplier A', 'Supplier B', 'Supplier C'], status: 'Monitoring' },
  ]

  const suppliers = [
    { name: 'Supplier A', risk: 'Low', alert: 'New factory expansion announced' },
    { name: 'Supplier B', risk: 'Medium', alert: 'Financial report delayed' },
  ]

  return (
    <div className="app">
      {/* Demo banner */}
      <section className="how-it-works" style={{ paddingTop: 24, paddingBottom: 0 }}>
        <div className="container">
          <div className="demo-banner">
            <span className="icon">ℹ️</span>
            <span>This is a demo dashboard. Features are under active development and will be released continuously.</span>
          </div>
        </div>
      </section>

      {/* Market Intelligence */}
      <SectionCard title="Market Intelligence" action={<button className="btn btn-secondary" onClick={loadIntel}>Refresh</button>}>
        {loading ? (
          <p className="section-subtitle" style={{ marginTop: 20 }}>Loading latest market signals…</p>
        ) : (
          <>
            {error && <p className="section-subtitle" style={{ marginTop: 0 }}>{error}</p>}
            <div className="pain-points-grid">
              {intel.list.map((item) => (
                <div key={item.label} className="pain-point" style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <h3 style={{ marginBottom: 0 }}>
                      <span style={{ marginRight: 8 }} aria-hidden="true">{iconFor(item.label)}</span>
                      {item.label}
                    </h3>
                    <TrendBadge trend={item.trend}>{item.trend}</TrendBadge>
                  </div>
                  <p style={{ fontSize: '1.25rem', color: '#0f172a', marginBottom: 8 }}>{item.value}</p>
                  <p style={{ color: '#64748b' }}>{item.change}</p>
                </div>
              ))}
            </div>
            {/* Intelligence footer (hidden) */}
            {false && (
              <div className="intelligence-footer" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                <small className="text-muted">
                  Data sources: SMM, BloombergNEF, and other public market data. Last updated: {new Date().toLocaleDateString()}
                </small>
              </div>
            )}
          </>
        )}
      </SectionCard>

      {/* Suggested Next Steps (hidden) */}
      {false && (
        <SectionCard title="Suggested Next Steps">
          <div className="pain-points-grid">
            <div className="pain-point" style={{ textAlign: 'left', background: 'rgba(15, 23, 42, 0.02)' }}>
              <h3 style={{ marginBottom: 12 }}>Make the most of SupplyFinder</h3>
              <ul className="tips-list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 8 }}>
                <li>
                  <span aria-hidden="true">📊 </span>
                  <strong>Save your insights:</strong> Bookmark this report for future reference
                </li>
                <li>
                  <span aria-hidden="true">🔔 </span>
                  <strong>Monitor changes:</strong> Add suppliers to your watchlist for real-time alerts
                </li>
                <li>
                  <span aria-hidden="true">💬 </span>
                  <strong>Get expert help:</strong> <Link to="/consultation" className="tip-link">Schedule a strategy session</Link>
                </li>
              </ul>
            </div>
          </div>
        </SectionCard>
      )}

      {/* Your Projects */}
      <SectionCard title="Your Projects" action={<a className="btn btn-secondary" href="#">New Project</a>}>
        <div className="pain-points-grid">
          {projects.map((p) => (
            <div key={p.name} className="pain-point" style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ marginBottom: 8 }}>{p.name}</h3>
                <span aria-hidden="true" title="Project" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', height: 44, width: 44, borderRadius: 10, background: 'rgba(37, 99, 235, 0.08)', border: '1px solid rgba(37, 99, 235, 0.25)', color: '#2563eb' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7 3h7l4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" stroke="#2563eb" strokeWidth="1.7" fill="#ffffff"/>
                    <path d="M14 3v4h4" stroke="#2563eb" strokeWidth="1.7"/>
                    <path d="M8 10h8M8 14h8M8 18h6" stroke="#3b82f6" strokeWidth="1.7"/>
                  </svg>
                </span>
              </div>
              <p style={{ color: '#64748b', marginBottom: 12 }}>Created on {p.date} · Status: {p.status}</p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {p.suppliers.map((s) => (
                  <span key={s} className="chip">{s}</span>
                ))}
              </div>
              <Link to="/sample-report" className="btn btn-muted">View Full Analysis Report</Link>
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Supplier Watchlist */}
      <SectionCard title="Supplier Watchlist" action={<a className="btn btn-secondary" href="#">Manage</a>}>
        <div className="pain-points-grid">
          {suppliers.map((s) => (
            <div key={s.name} className="pain-point" style={{ textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                <h3 style={{ marginBottom: 0 }}>{s.name}</h3>
                <span className={`risk-badge risk-${s.risk.toLowerCase()}`}>{s.risk}</span>
              </div>
              <p style={{ color: '#64748b' }}>{s.alert}</p>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  )
}

export default Dashboard
