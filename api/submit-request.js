import sgMail from '@sendgrid/mail'

// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, company, email, requestDetails } = req.body

    // Validate required fields
    if (!name || !company || !email || !requestDetails) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        details: 'Name, company, email, and request details are required'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format'
      })
    }

    // Prepare email content
    const emailContent = {
      to: process.env.MAIL_TO || 'hello@supplyfinder.ai',
      from: process.env.MAIL_FROM || 'hello@supplyfinder.ai',
      subject: `New SupplyFinder Request from ${company}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            New SupplyFinder Request
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-bottom: 15px;">Contact Information</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Company:</strong> ${company}</p>
            <p><strong>Email:</strong> ${email}</p>
          </div>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #1e293b; margin-bottom: 15px;">Sourcing Requirements</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${requestDetails}</p>
          </div>
          
          <div style="background: #e0f2fe; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #0369a1;">
              <strong>Next Steps:</strong> Please review this request and contact the client within 24 hours. 
              Our AI analysis will be available in the admin dashboard.
            </p>
          </div>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #64748b; font-size: 14px;">
              This request was submitted through SupplyFinder.ai
            </p>
          </div>
        </div>
      `,
      text: `
        New SupplyFinder Request
        
        Contact Information:
        - Name: ${name}
        - Company: ${company}
        - Email: ${email}
        
        Sourcing Requirements:
        ${requestDetails}
        
        Next Steps: Please review this request and contact the client within 24 hours.
        
        ---
        This request was submitted through SupplyFinder.ai
      `
    }

    // Send email
    await sgMail.send(emailContent)

    // Log successful submission (for monitoring)
    console.log(`New request submitted: ${name} from ${company} (${email})`)

    return res.status(200).json({ 
      success: true,
      message: 'Request submitted successfully'
    })

  } catch (error) {
    console.error('Error sending email:', error)
    
    // Handle SendGrid specific errors
    if (error.response) {
      console.error('SendGrid error details:', error.response.body)
    }
    
    return res.status(500).json({ 
      error: 'Failed to send request',
      message: 'There was an error processing your request. Please try again later.'
    })
  }
}
