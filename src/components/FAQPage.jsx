import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FAQPage = () => {
  const [openItems, setOpenItems] = useState(new Set())
  const navigate = useNavigate()

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems)
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index)
    } else {
      newOpenItems.add(index)
    }
    setOpenItems(newOpenItems)
  }

  const faqData = [
    {
      question: "What is SupplyFinder.AI and how does it work?",
      answer: "SupplyFinder.AI is an AI-powered B2B platform that helps overseas energy storage integrators find and vet global suppliers through our intelligent analysis engine. Our platform uses advanced AI algorithms to match your specific requirements with verified suppliers worldwide, reducing sourcing time from weeks to minutes."
    },
    {
      question: "Who can use SupplyFinder.AI?",
      answer: "Our platform is designed for energy storage integrators, system installers, project developers, and procurement teams who need to source batteries, inverters, energy management systems, and related components for energy storage projects. We serve both small-scale residential projects and large-scale utility installations."
    },
    {
      question: "How does the AI matching process work?",
      answer: "Our AI analyzes your project requirements including technical specifications, quantity, timeline, geographic preferences, certifications needed, and budget constraints. It then matches these against our database of verified suppliers, considering factors like product compatibility, supplier reliability, logistics capabilities, and compliance with your region's standards."
    },
    {
      question: "What types of energy storage components can I source?",
      answer: "You can source a wide range of energy storage components including lithium-ion batteries (LiFePO4, NMC, LTO), lead-acid batteries, flow batteries, battery management systems (BMS), inverters, energy management systems (EMS), thermal management systems, safety equipment, and monitoring solutions from various manufacturers and suppliers."
    },
    {
      question: "How do you verify supplier quality and reliability?",
      answer: "We maintain a rigorous verification process that includes checking supplier certifications (ISO, UL, CE, etc.), financial stability, production capacity, quality control processes, past project references, and compliance with international standards. Our AI continuously monitors supplier performance and customer feedback to maintain our database quality."
    },
    {
      question: "What geographic regions do you cover?",
      answer: "SupplyFinder.AI has a global network covering major manufacturing regions including China, South Korea, Japan, Europe, and North America. We work with suppliers who can serve markets worldwide, ensuring you can find the right supplier regardless of your project location."
    },
    {
      question: "How long does the sourcing process take?",
      answer: "Our AI can provide initial supplier matches within minutes of submitting your requirements. The complete process, including detailed quotes, technical specifications, and supplier verification, typically takes 24-48 hours. This is significantly faster than traditional sourcing methods that can take weeks."
    },
    {
      question: "What information do I need to provide for sourcing?",
      answer: "To get the best matches, please provide: project specifications (battery type, capacity, voltage, cycle life), quantity requirements, timeline, geographic preferences, required certifications, budget range, and any specific technical requirements. The more detailed your requirements, the more accurate our AI matching will be."
    },
    {
      question: "Is there a cost to use SupplyFinder.AI?",
      answer: "We offer different pricing tiers to suit various needs. Basic sourcing requests are free, while premium features including detailed supplier analysis, priority support, and advanced matching algorithms are available through our subscription plans. Contact us for detailed pricing information."
    },
    {
      question: "How do you ensure data security and confidentiality?",
      answer: "We take data security seriously and implement enterprise-grade security measures including end-to-end encryption, secure data transmission, and strict access controls. Your project information and supplier communications are protected and never shared without your explicit consent. We comply with international data protection regulations including GDPR and CCPA."
    },
    {
      question: "Can I get samples or visit supplier facilities?",
      answer: "Yes, we can facilitate sample requests and factory visits as part of our comprehensive sourcing service. Our platform includes tools to coordinate sample logistics, arrange virtual or in-person facility tours, and manage the evaluation process to help you make informed decisions."
    },
    {
      question: "What if I'm not satisfied with the supplier matches?",
      answer: "We're committed to your success. If our initial matches don't meet your needs, our team will work with you to refine the search criteria and provide additional options. We also offer ongoing support throughout the procurement process to ensure successful project completion."
    },
    {
      question: "Do you provide logistics and shipping support?",
      answer: "Yes, we work with a network of logistics partners to help coordinate shipping, customs clearance, and delivery to your project site. Our platform can provide logistics quotes and track shipments to ensure smooth delivery of your energy storage components."
    },
    {
      question: "How do I get started with SupplyFinder.AI?",
      answer: "Getting started is simple: submit your sourcing requirements through our online form, and our AI will analyze your needs and provide matched suppliers within 24 hours. You can also schedule a consultation with our team to discuss your specific project requirements and how we can help optimize your sourcing process."
    },
    {
      question: "What support do you provide after supplier selection?",
      answer: "We provide ongoing support throughout your project lifecycle, including contract negotiation assistance, quality assurance monitoring, logistics coordination, and technical support. Our team is available to help resolve any issues and ensure successful project delivery."
    }
  ]

  return (
    <div className="faq-page">
      {/* Header Section */}
      <section className="faq-hero">
        <div className="container">
          <h1 className="faq-title">Frequently Asked Questions</h1>
          <p className="faq-subtitle">
            Find answers to common questions about SupplyFinder.AI and our AI-powered energy storage sourcing platform.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="faq-content">
        <div className="container">
          <div className="faq-list">
            {faqData.map((item, index) => (
              <div key={index} className="faq-item">
                <button
                  className={`faq-question ${openItems.has(index) ? 'open' : ''}`}
                  onClick={() => toggleItem(index)}
                  aria-expanded={openItems.has(index)}
                >
                  <span className="question-text">{item.question}</span>
                  <span className="toggle-icon">
                    {openItems.has(index) ? '−' : '+'}
                  </span>
                </button>
                <div className={`faq-answer ${openItems.has(index) ? 'open' : ''}`}>
                  <div className="answer-content">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="faq-cta">
        <div className="container">
          <div className="cta-content">
            <h2>Still have questions?</h2>
            <p>Our team is here to help you find the perfect energy storage suppliers for your project.</p>
            <button 
              className="cta-button"
              onClick={() => {
                navigate('/')
                // 等待页面跳转后滚动到表单
                setTimeout(() => {
                  document.getElementById('request-form')?.scrollIntoView({ behavior: 'smooth' })
                }, 100)
              }}
            >
              Submit Your Requirements
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FAQPage
