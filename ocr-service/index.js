const express = require('express');
const Tesseract = require('tesseract.js');

const app = express();
app.use(express.json());

app.post('/parse', async (req, res) => {
  const { fileUrl } = req.body;
  try {
    // Basic OCR using Tesseract; for PoC only
    const result = await Tesseract.recognize(fileUrl, 'fra');
    const text = result.data.text;
    // Very naive parsing for demo purposes
    res.json({
      name: '',
      siren: '',
      address: '',
      sector: '',
      rawText: text
    });
  } catch (e) {
    res.status(500).json({ error: 'parse failed' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`ocr-service listening on ${port}`));
