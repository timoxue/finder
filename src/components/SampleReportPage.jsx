import React from 'react'
import { Link } from 'react-router-dom'

const SampleReportPage = () => {
  return (
    <div className="sample-report-page">
      {/* Header Section */}
      <section className="report-hero">
        <div className="container">
          <h1 className="report-title">Sample Supplier Shortlist Report</h1>
          <p className="report-subtitle">
            See what you'll receive when you submit your sourcing requirements
          </p>
        </div>
      </section>

      {/* Report Content */}
      <section className="report-content">
        <div className="container">
          <div className="report-card">
            <div className="report-header">
              <h2>Energy Storage Supplier Analysis</h2>
              <p className="report-meta">Generated: [Date] | Project: [Your Project Name]</p>
            </div>

            <div className="report-section">
              <h3>Executive Summary</h3>
              <p>
                Based on your requirements for 100kWh lithium-ion battery systems, we've identified 3 
                verified suppliers that meet your specifications. All suppliers have been pre-screened 
                for quality certifications, production capacity, and delivery capabilities.
              </p>
            </div>

            <div className="report-section">
              <h3>Top Supplier Recommendations</h3>
              
              <div className="supplier-card">
                <div className="supplier-header">
                  <h4>Supplier A - [Anonymized]</h4>
                  <span className="match-score">95% Match</span>
                </div>
                <div className="supplier-details">
                  <p><strong>Location:</strong> Asia-Pacific</p>
                  <p><strong>Certifications:</strong> UL 1973, IEC 62619, ISO 9001</p>
                  <p><strong>Capacity:</strong> 2GWh annually</p>
                  <p><strong>Lead Time:</strong> 8-12 weeks</p>
                  <p><strong>Price Range:</strong> $180-220/kWh</p>
                  <p><strong>Strengths:</strong> Excellent quality control, proven track record with European projects</p>
                </div>
              </div>

              <div className="supplier-card">
                <div className="supplier-header">
                  <h4>Supplier B - [Anonymized]</h4>
                  <span className="match-score">88% Match</span>
                </div>
                <div className="supplier-details">
                  <p><strong>Location:</strong> Europe</p>
                  <p><strong>Certifications:</strong> CE, TÜV, ISO 14001</p>
                  <p><strong>Capacity:</strong> 500MWh annually</p>
                  <p><strong>Lead Time:</strong> 6-10 weeks</p>
                  <p><strong>Price Range:</strong> $200-240/kWh</p>
                  <p><strong>Strengths:</strong> Local support, faster delivery, environmental compliance</p>
                </div>
              </div>

              <div className="supplier-card">
                <div className="supplier-header">
                  <h4>Supplier C - [Anonymized]</h4>
                  <span className="match-score">82% Match</span>
                </div>
                <div className="supplier-details">
                  <p><strong>Location:</strong> North America</p>
                  <p><strong>Certifications:</strong> UL 9540, IEEE 1547</p>
                  <p><strong>Capacity:</strong> 1.5GWh annually</p>
                  <p><strong>Lead Time:</strong> 10-14 weeks</p>
                  <p><strong>Price Range:</strong> $190-230/kWh</p>
                  <p><strong>Strengths:</strong> Advanced BMS technology, grid-tie expertise</p>
                </div>
              </div>
            </div>

            <div className="report-section">
              <h3>Risk Assessment</h3>
              <ul>
                <li>All suppliers have passed financial stability checks</li>
                <li>Quality assurance programs verified through third-party audits</li>
                <li>Supply chain resilience assessed for each recommendation</li>
                <li>Regulatory compliance confirmed for target markets</li>
              </ul>
            </div>

            <div className="report-section">
              <h3>Next Steps</h3>
              <p>
                To proceed with detailed negotiations and final supplier selection, 
                our team will facilitate direct introductions and provide ongoing 
                support throughout the procurement process.
              </p>
            </div>
          </div>

          <div className="report-cta">
            <h3>Ready to Get Your Custom Report?</h3>
            <p>Submit your specific requirements and receive a personalized analysis within 24 hours.</p>
            <Link to="/" className="cta-button">
              Submit Your Requirements
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default SampleReportPage
