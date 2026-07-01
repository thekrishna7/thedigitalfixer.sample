require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// Basic Rate Limiter to prevent spam submissions (Max 5 submissions per 10 minutes per IP)
const formLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: { error: 'Too many submissions from this IP, please try again later.' }
});

// Admin Basic Authentication Details
const ADMIN_USER = 'admin';
const ADMIN_PASS = 'tdfadmin2026';

function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required');
  }

  try {
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
    const user = auth[0];
    const pass = auth[1];

    if (user === ADMIN_USER && pass === ADMIN_PASS) {
      next();
    } else {
      res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
      return res.status(401).send('Invalid credentials');
    }
  } catch (err) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication failed');
  }
}

// Initialize SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'enquiries.db'), (err) => {
  if (err) console.error('Database connection error:', err.message);
  else console.log('Connected to the SQLite enquiries database.');
});

// Setup tables
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    company TEXT,
    service TEXT NOT NULL,
    message TEXT,
    source_url TEXT,
    date TEXT NOT NULL,
    status TEXT DEFAULT 'New'
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS email_retries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    enquiry_id INTEGER,
    email_type TEXT,
    attempts INTEGER DEFAULT 0,
    last_error TEXT,
    created_at TEXT
  )`);
});

// SMTP Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: (process.env.SMTP_PASS || '').trim()
  }
});

// Verifying SMTP connection on start
transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP Connection Warning:', error.message);
  } else {
    console.log('SMTP Server is ready to deliver messages.');
  }
});

// Helper: Format Date
function getFormattedDate() {
  const options = { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' };
  return new Date().toLocaleString('en-IN', options);
}

// Helper: Email Templates
function getAdminEmailHtml(data) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <div style="background: linear-gradient(135deg, #1e3a8a, #0ea5e9); padding: 25px; text-align: center; color: white;">
        <h2 style="margin: 0; font-size: 24px; font-weight: 700;">New Enquiry Received</h2>
        <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">The Digital Fixer Lead Management System</p>
      </div>
      <div style="padding: 30px; background: #ffffff;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr style="background: #f8fafc;">
            <td style="padding: 12px 15px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0; width: 35%;">Full Name:</td>
            <td style="padding: 12px 15px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Email Address:</td>
            <td style="padding: 12px 15px; color: #475569; border-bottom: 1px solid #e2e8f0;"><a href="mailto:${data.email}" style="color: #0ea5e9; text-decoration: none;">${data.email}</a></td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px 15px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Phone Number:</td>
            <td style="padding: 12px 15px; color: #475569; border-bottom: 1px solid #e2e8f0;"><a href="tel:${data.phone}" style="color: #0ea5e9; text-decoration: none;">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Company:</td>
            <td style="padding: 12px 15px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.company || 'N/A'}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px 15px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Service Requested:</td>
            <td style="padding: 12px 15px; font-weight: bold; color: #1e3a8a; border-bottom: 1px solid #e2e8f0;">${data.service}</td>
          </tr>
          <tr>
            <td style="padding: 12px 15px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Date & Time:</td>
            <td style="padding: 12px 15px; color: #475569; border-bottom: 1px solid #e2e8f0;">${data.date}</td>
          </tr>
          <tr style="background: #f8fafc;">
            <td style="padding: 12px 15px; font-weight: bold; color: #334155; border-bottom: 1px solid #e2e8f0;">Source Page:</td>
            <td style="padding: 12px 15px; color: #475569; border-bottom: 1px solid #e2e8f0;"><a href="${data.source_url}" target="_blank" style="color: #0ea5e9; text-decoration: none; font-size: 13px;">View page URL</a></td>
          </tr>
          <tr>
            <td colspan="2" style="padding: 20px 15px 0;">
              <h4 style="margin: 0 0 10px; color: #1e3a8a;">Message / Enquiry Details:</h4>
              <div style="background: #f1f5f9; padding: 15px; border-radius: 6px; color: #334155; white-space: pre-wrap; font-size: 14px; border: 1px solid #e2e8f0;">${data.message || '(No message content)'}</div>
            </td>
          </tr>
        </table>
      </div>
      <div style="background: #f8fafc; padding: 20px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0;">
        <strong>The Digital Fixer</strong> | Ambah, Morena & Gurugram<br>
        Empowering Your Digital Growth.
      </div>
    </div>
  `;
}

function getCustomerEmailHtml(data) {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
      <!-- Brand Header -->
      <div style="background: linear-gradient(135deg, #1e3a8a, #0ea5e9); padding: 30px; text-align: center; color: white;">
        <img src="https://thedigitalfixer.com/assets/images/logo.png" alt="The Digital Fixer" style="max-height: 60px; margin-bottom: 15px; border-radius: 4px;" onerror="this.style.display='none'">
        <h2 style="margin: 0; font-size: 22px; font-weight: 700;">We've Received Your Enquiry!</h2>
        <p style="margin: 5px 0 0; font-size: 14px; opacity: 0.9;">Thank you for reaching out to us.</p>
      </div>

      <!-- Main Content Body -->
      <div style="padding: 30px 25px; background: #ffffff; color: #334155;">
        <p style="font-size: 16px; margin-top: 0;">Dear <strong>${data.name}</strong>,</p>
        <p style="font-size: 15px; line-height: 1.7; color: #475569;">
          Thank you for contacting <strong>The Digital Fixer</strong>. Our team has successfully received your request for <strong>${data.service}</strong>. 
        </p>
        <p style="font-size: 15px; line-height: 1.7; color: #475569;">
          We are analyzing your requirements, and one of our solution consultants will contact you shortly to schedule a consultation or share our proposals.
        </p>

        <!-- Call-to-action details -->
        <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 6px; padding: 20px; margin: 2rem 0; text-align: center;">
          <h4 style="margin: 0 0 10px; color: #166534; font-size: 16px;">Need Immediate Assistance?</h4>
          <p style="margin: 0 0 15px; font-size: 14px; color: #166534;">You can connect directly with our founder on WhatsApp for immediate support.</p>
          <a href="https://wa.me/918109065947?text=Hi%20Krishna,%20I%20just%20submitted%20an%20enquiry%20for%20${encodeURIComponent(data.service)}." target="_blank" style="background: #25d366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 14px; display: inline-block; box-shadow: 0 4px 6px rgba(37,211,102,0.2);">
            💬 Chat on WhatsApp
          </a>
        </div>

        <div style="border-top: 1px solid #f1f5f9; padding-top: 20px; margin-top: 20px;">
          <p style="margin: 0 0 5px; color: #64748b; font-size: 13px;">Warm Regards,</p>
          <p style="margin: 0; font-weight: bold; color: #1e3a8a; font-size: 15px;">Krishna Sharma</p>
          <p style="margin: 0; color: #64748b; font-size: 13px;">Founder & CEO, The Digital Fixer</p>
          <p style="margin: 0; color: #64748b; font-size: 13px;">Phone: +91 8109065947</p>
        </div>
      </div>

      <!-- Footer Info -->
      <div style="background: #f8fafc; padding: 25px; text-align: center; color: #64748b; font-size: 12px; border-top: 1px solid #e2e8f0; line-height: 1.8;">
        <strong>The Digital Fixer</strong><br>
        <strong>Headquarters:</strong> Near Rajiv Gandhi School, Ambah, Morena, Madhya Pradesh – India.<br>
        <strong>Branch Office:</strong> Farrukhnagar, Gurugram, Haryana – India.<br>
        <span style="font-style: italic; color: #94a3b8; display: block; margin-top: 10px;">"Empowering Your Digital Growth."</span>
      </div>
    </div>
  `;
}

// Function: Process Email Notifications
async function sendEmails(enquiryData, enquiryId) {
  // 1. Send Admin Email
  const adminMailOptions = {
    from: `"TDF Form Alerts" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject: `[The Digital Fixer] New Enquiry - ${enquiryData.service}`,
    html: getAdminEmailHtml(enquiryData)
  };

  try {
    await transporter.sendMail(adminMailOptions);
    console.log(`Admin email alert sent successfully for Enquiry #${enquiryId}`);
  } catch (err) {
    console.error(`Failed to send Admin email for Enquiry #${enquiryId}:`, err.message);
    logEmailRetry(enquiryId, 'admin', err.message);
  }

  // 2. Send Customer Confirmation Email
  const customerMailOptions = {
    from: `"The Digital Fixer" <${process.env.SMTP_USER}>`,
    to: enquiryData.email,
    subject: `Thank You for Contacting The Digital Fixer`,
    html: getCustomerEmailHtml(enquiryData)
  };

  try {
    await transporter.sendMail(customerMailOptions);
    console.log(`Customer confirmation email sent to ${enquiryData.email}`);
  } catch (err) {
    console.error(`Failed to send Customer confirmation to ${enquiryData.email}:`, err.message);
    logEmailRetry(enquiryId, 'customer', err.message);
  }
}

// Log failed email requests for automated retry scheduler
function logEmailRetry(enquiryId, emailType, errorMsg) {
  const query = `INSERT INTO email_retries (enquiry_id, email_type, last_error, created_at) VALUES (?, ?, ?, ?)`;
  db.run(query, [enquiryId, emailType, errorMsg, getFormattedDate()], (err) => {
    if (err) console.error('Failed to log email retry to DB:', err.message);
  });
}

// API endpoint: Form Submission
app.post('/api/enquiry', formLimiter, (req, res) => {
  const { name, email, phone, company, service, message, sourceUrl } = req.body;

  // Server-side validation
  if (!name || !email || !phone || !service) {
    return res.status(400).json({ error: 'Name, email, phone number, and service selection are required.' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }

  const phoneSanitized = phone.replace(/\D/g, '');
  if (phoneSanitized.length < 10) {
    return res.status(400).json({ error: 'Please enter a valid phone number.' });
  }

  const submissionDate = getFormattedDate();

  const query = `INSERT INTO enquiries (name, email, phone, company, service, message, source_url, date) 
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.run(query, [name.trim(), email.trim(), phone.trim(), company ? company.trim() : '', service.trim(), message ? message.trim() : '', sourceUrl || '', submissionDate], function(err) {
    if (err) {
      console.error('Database write error:', err.message);
      return res.status(500).json({ error: 'Could not record enquiry in database.' });
    }

    const insertedId = this.lastID;
    
    // Trigger asynchronous email sending
    sendEmails({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      company: company ? company.trim() : '',
      service: service.trim(),
      message: message ? message.trim() : '',
      source_url: sourceUrl || '',
      date: submissionDate
    }, insertedId);

    return res.json({ success: true, message: 'Enquiry submitted successfully!', id: insertedId });
  });
});

// API endpoint: Get Enquiries (Basic Auth Secured)
app.get('/api/enquiries', adminAuth, (req, res) => {
  const { service, status, search } = req.query;

  let query = `SELECT * FROM enquiries WHERE 1=1`;
  const params = [];

  if (service) {
    query += ` AND service = ?`;
    params.push(service);
  }

  if (status) {
    query += ` AND status = ?`;
    params.push(status);
  }

  if (search) {
    query += ` AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR message LIKE ? OR company LIKE ?)`;
    const searchParam = `%${search}%`;
    params.push(searchParam, searchParam, searchParam, searchParam, searchParam);
  }

  query += ` ORDER BY id DESC`;

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Error fetching data from database.' });
    }
    return res.json(rows);
  });
});

// API endpoint: Update Status (Basic Auth Secured)
app.post('/api/enquiries/:id/status', adminAuth, (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status || !['New', 'Contacted', 'Closed'].includes(status)) {
    return res.status(400).json({ error: 'Valid status (New, Contacted, Closed) is required.' });
  }

  const query = `UPDATE enquiries SET status = ? WHERE id = ?`;
  db.run(query, [status, id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Error updating enquiry status.' });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Enquiry not found.' });
    }
    return res.json({ success: true, message: 'Status updated successfully!' });
  });
});

// API endpoint: Export to Excel (CSV Format, Basic Auth Secured)
app.get('/api/enquiries/export', adminAuth, (req, res) => {
  db.all(`SELECT * FROM enquiries ORDER BY id DESC`, [], (err, rows) => {
    if (err) {
      return res.status(500).send('Error preparing spreadsheet export.');
    }

    // Prepare CSV header
    let csvContent = 'ID,Name,Email,Phone,Company,Service,Message,Source Page,Date,Status\n';
    
    // Add data rows
    rows.forEach(row => {
      // Escape quotes and fields to ensure proper CSV structure
      const id = row.id;
      const name = `"${(row.name || '').replace(/"/g, '""')}"`;
      const email = `"${(row.email || '').replace(/"/g, '""')}"`;
      const phone = `"${(row.phone || '').replace(/"/g, '""')}"`;
      const company = `"${(row.company || '').replace(/"/g, '""')}"`;
      const service = `"${(row.service || '').replace(/"/g, '""')}"`;
      const message = `"${(row.message || '').replace(/"/g, '""').replace(/\r?\n/g, ' ')}"`;
      const sourceUrl = `"${(row.source_url || '').replace(/"/g, '""')}"`;
      const date = `"${(row.date || '').replace(/"/g, '""')}"`;
      const status = `"${(row.status || '').replace(/"/g, '""')}"`;

      csvContent += `${id},${name},${email},${phone},${company},${service},${message},${sourceUrl},${date},${status}\n`;
    });

    // Set response headers to force download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=TDF_Enquiries_Export.csv');
    return res.send(csvContent);
  });
});

// Serve Admin Panel File directly at /admin
app.get('/admin', adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

// Handle 404 pages (Clean URLs support)
app.use((req, res) => {
  const ext = path.extname(req.url).toLowerCase();
  if (ext === '') {
    const htmlPath = path.join(__dirname, req.url + '.html');
    res.sendFile(htmlPath, (err) => {
      if (err) {
        res.status(404).sendFile(path.join(__dirname, '404.html'));
      }
    });
  } else {
    res.status(404).sendFile(path.join(__dirname, '404.html'));
  }
});

// Start Server
const serverInstance = app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/`);
});

// Automated Email Retry Scheduler (Checks and retries every 3 minutes)
setInterval(async () => {
  db.all(`SELECT * FROM email_retries WHERE attempts < 5`, [], async (err, retries) => {
    if (err || !retries || retries.length === 0) return;

    console.log(`SMTP Scheduler: Retrying ${retries.length} failed email transmissions...`);
    
    for (const retry of retries) {
      db.get(`SELECT * FROM enquiries WHERE id = ?`, [retry.enquiry_id], async (enqErr, enq) => {
        if (enqErr || !enq) {
          // Clean up if original enquiry is missing
          db.run(`DELETE FROM email_retries WHERE id = ?`, [retry.id]);
          return;
        }

        let success = false;
        let lastError = '';

        if (retry.email_type === 'admin') {
          try {
            await transporter.sendMail({
              from: `"TDF Form Alerts" <${process.env.SMTP_USER}>`,
              to: process.env.SMTP_USER,
              subject: `[The Digital Fixer] New Enquiry - ${enq.service}`,
              html: getAdminEmailHtml(enq)
            });
            success = true;
          } catch (e) {
            lastError = e.message;
          }
        } else if (retry.email_type === 'customer') {
          try {
            await transporter.sendMail({
              from: `"The Digital Fixer" <${process.env.SMTP_USER}>`,
              to: enq.email,
              subject: `Thank You for Contacting The Digital Fixer`,
              html: getCustomerEmailHtml(enq)
            });
            success = true;
          } catch (e) {
            lastError = e.message;
          }
        }

        if (success) {
          db.run(`DELETE FROM email_retries WHERE id = ?`, [retry.id]);
          console.log(`SMTP Scheduler: Retry succeeded for ${retry.email_type} email (Enquiry #${retry.enquiry_id})`);
        } else {
          db.run(`UPDATE email_retries SET attempts = attempts + 1, last_error = ?, created_at = ? WHERE id = ?`,
            [lastError, getFormattedDate(), retry.id]);
          console.log(`SMTP Scheduler: Retry failed again for ${retry.email_type} email (Enquiry #${retry.enquiry_id}): ${lastError}`);
        }
      });
    }
  });
}, 180000); // 3 minutes
