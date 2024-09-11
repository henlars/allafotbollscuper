import { spawn } from 'child_process';

export default async function handler(req, res) {
  // Check authentication
  if (!req.headers.authorization) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const py = spawn('python', ['scraping.py']);
}
