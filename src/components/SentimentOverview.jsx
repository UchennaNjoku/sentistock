import React from 'react';

function SentimentOverview({ sentiment }) {
  const renderSentimentColor = (sentiment) => {
    const colors = {
      positive: 'green',
      neutral: 'gray',
      negative: 'red'
    };
    return colors[sentiment] || 'black';
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Overall Sentiment</h3>
        <p className="text-2xl font-bold" style={{color: renderSentimentColor(sentiment.overall_sentiment)}}>
          {sentiment.overall_sentiment.toUpperCase()}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Sentiment Score</h3>
        <p className="text-2xl font-bold">{sentiment.sentiment_breakdown.score.toFixed(2)}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Confidence</h3>
        <p className="text-2xl font-bold">{(sentiment.sentiment_breakdown.confidence * 100).toFixed(2)}%</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">News Count</h3>
        <p className="text-2xl font-bold">{sentiment.sentiment_breakdown.news_count}</p>
      </div>
    </div>
  );
}

export default SentimentOverview;
