import React from 'react';

function NewsAnalysis({ news }) {
  const renderSentimentColor = (sentiment) => {
    const colors = {
      positive: 'green',
      neutral: 'gray',
      negative: 'red'
    };
    return colors[sentiment] || 'black';
  };

  return (
    <div>
      <h3 className="text-2xl font-semibold mb-4">Analyzed News</h3>
      {news.map((item, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4">
          <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
          <p className="mb-2"><span className="font-semibold">Category:</span> {item.category}</p>
          <p className="mb-2"><span className="font-semibold">Published:</span> {new Date(item.providerPublishTime * 1000).toLocaleString()}</p>
          <p className="mb-2">
            <span className="font-semibold">Title Sentiment:</span> 
            <span style={{color: renderSentimentColor(item.title_sentiment.sentiment)}}> {item.title_sentiment.sentiment}</span>
          </p>
          <p className="mb-2">
            <span className="font-semibold">Summary Sentiment:</span> 
            <span style={{color: renderSentimentColor(item.summary_sentiment.sentiment)}}> {item.summary_sentiment.sentiment}</span>
          </p>
          <p>{item.summary}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsAnalysis;
