import express from 'express';
import cors from 'cors';
import path from 'path';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';

const app = express();

app.use(cors());
app.use(express.json());

const folderPath = path.join(__dirname, '..', 'data');
const filePath = path.join(__dirname, '..', 'data', 'result.json');

app.get('/load', (_req, res): void => {
  try {
    const data = readFileSync(filePath, 'utf-8');
    res.status(200).json(JSON.parse(data));
  } catch {
    res.status(404).json({ error: 'No saved result!' });
  }
});

app.post('/save', (req, res): void => {
  const { result } = req.body as { result: string };
  if (!result) {
    res.status(400).json({ error: 'Result not provided' });
    return;
  }

  if (!existsSync(folderPath)) {
    try {
      mkdirSync(folderPath);
    } catch (err) {
      res.status(500).json({ error: 'Something went wrong!' });
      return;
    }
  }

  try {
    writeFileSync(filePath, result);
  } catch (err) {
    res.status(500).json({ error: 'Error during file writing' });
    return;
  }

  res.status(201).json();
});

export default app;
