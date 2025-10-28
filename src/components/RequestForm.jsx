import React, { useState } from 'react'

const RequestForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    requestDetails: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    if (!formData.requestDetails.trim()) {
      newErrors.requestDetails = 'Request details are required'
    } else if (formData.requestDetails.trim().length < 20) {
      newErrors.requestDetails = 'Please provide more detailed requirements (at least 20 characters)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        setIsSubmitted(true)
        setFormData({ name: '', company: '', email: '', requestDetails: '' })
      } else {
        // Handle API error responses
        const errorMessage = result.message || result.error || 'Failed to submit request'
        alert(`Error: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('There was an error submitting your request. Please check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="form-success">
        <div className="success-icon">✓</div>
        <h3>Request Submitted Successfully!</h3>
        <p>Thank you for your interest. Our AI is analyzing your requirements and we'll get back to you within 24 hours.</p>
        <button 
          className="cta-button" 
          onClick={() => setIsSubmitted(false)}
        >
          Submit Another Request
        </button>
      </div>
    )
  }

  return (
    <div className="request-form-container">
      <form onSubmit={handleSubmit} className="request-form">
        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            placeholder="Enter your full name"
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="company">Company Name *</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className={errors.company ? 'error' : ''}
            placeholder="Enter your company name"
          />
          {errors.company && <span className="error-message">{errors.company}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            placeholder="Enter your email address"
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="requestDetails">Sourcing Requirements *</label>
          <textarea
            id="requestDetails"
            name="requestDetails"
            value={formData.requestDetails}
            onChange={handleChange}
            className={errors.requestDetails ? 'error' : ''}
            placeholder="Please describe your energy storage sourcing needs in detail (e.g., battery type, capacity, quantity, timeline, geographic preferences, certifications required, etc.)"
            rows="5"
          />
          {errors.requestDetails && <span className="error-message">{errors.requestDetails}</span>}
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Analyzing Requirements...' : 'Submit Requirements'}
        </button>
      </form>
    </div>
  )
}

export default RequestForm
