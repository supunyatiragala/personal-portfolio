export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  // Empty Message Check 
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { 
            role: 'system', 
            content: `You are Supun Priyashanka's AI Portfolio Assistant. Answer questions politely, professionally, and concisely (1-3 sentences max). Supun is a Software Engineering Undergraduate at SLTC, skilled in Python, Java, Web Dev, MySQL, Figma.` 
          },
          { role: 'user', content: message }
        ]
      })
    });

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Vercel API Error:', error);
    return res.status(500).json({ error: 'Failed to fetch response' });
  }
}