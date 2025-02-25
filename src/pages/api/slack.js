import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, phone } = req.body;

    try {
      const slackWebhookUrl = process.env.SLACK_API_KEY;

      await axios.post(slackWebhookUrl, {
        text: `New Form Submission:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
      });

      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error submitting form:', error);
      res.status(500).json({ message: 'Failed to submit form.' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed.' });
  }
}
