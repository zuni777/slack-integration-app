import axios from 'axios';

const getSlackWebhookUrl = () => {
  const baseUrl = 'https://hooks.slack.com/services';
  const defaultPath = process.env.SLACK_WEBHOOK_PATH;

  if (!defaultPath) {
    throw new Error('Slack webhook path is missing');
  }

  return `${baseUrl}/${defaultPath}`;
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed.' });
  }

  const { name, email, phone } = req.body;

  try {
    const slackWebhookUrl = getSlackWebhookUrl();

    await axios.post(slackWebhookUrl, {
      text: `New Form Submission:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
    });

    res.status(200).json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Failed to submit form.' });
  }
}
