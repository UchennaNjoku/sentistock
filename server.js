const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/api/sentiment', (req, res) => {
  // TODO: Implement sentiment analysis
  res.json({ sentiment: 'neutral' });
});

app.get('/api/stock-prediction', (req, res) => {
  // TODO: Implement stock prediction
  res.json({ prediction: 100 });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
