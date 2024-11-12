import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [symbol, setSymbol] = useState('');
  const [stockSentiment, setStockSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeStockSentiment = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:5000/api/stock-sentiment?symbol=${symbol}`);
      setStockSentiment(response.data);
    } catch (error) {
      setError(error.response?.data?.error || 'An error occurred');
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>SentiStock Dashboard</h1>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value.toUpperCase())}
        placeholder="Enter stock symbol (e.g., AAPL)"
      />
      <button onClick={analyzeStockSentiment} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze Stock Sentiment'}
      </button>
      
      {error && <p style={{color: 'red'}}>{error}</p>}
      
      {stockSentiment && (
        <div>
          <h2>Stock Sentiment Analysis for {stockSentiment.symbol}</h2>
          <p>Overall Sentiment: {stockSentiment.overall_sentiment}</p>
          <h3>Analyzed News:</h3>
          {stockSentiment.analyzed_news.map((news, index) => (
            <div key={index}>
              <h4>{news.title}</h4>
              <p>Title Sentiment: {news.title_sentiment.sentiment}</p>
              <p>Summary Sentiment: {news.summary_sentiment.sentiment}</p>
              <p>{news.summary}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
