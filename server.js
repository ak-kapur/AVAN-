const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle form submission
app.post('/send-email', async (req, res) => {
    const { name, email, message } = req.body;

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Use your email provider (e.g., Gmail, Outlook)
        auth: {
            user: 'info@avanca.in', // Your email address
            pass: 'Beta#1234'   // Your email password or app password
        }
    });

    const mailOptions = {
        from: 'info@avanca.in',
        to: email, // Send email to the user who submitted the form
        subject: 'Thank you for contacting AVAN & Associates',
        text: `Hi ${name},\n\nThank you for reaching out to us. We have received your message:\n\n"${message}"\n\nWe will get back to you shortly.\n\nBest regards,\nAVAN & Associates`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});