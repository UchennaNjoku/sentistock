import React from 'react';

function SentimentDistribution({ distribution }) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Sentiment Distribution</h3>
      <ul className="bg-white p-6 rounded-lg shadow-md">
        {Object.entries(distribution).map(([label, score]) => (
          <li key={label} className="mb-2">
            <span className="font-semibold">{label}:</span> {(score * 100).toFixed(2)}%
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SentimentDistribution;
