import React from 'react';
import { Line } from 'react-chartjs-2';

function SentimentTrendChart({ trend }) {
  const data = {
    labels: trend.map(item => item.date),
    datasets: [
      {
        label: 'Sentiment Trend',
        data: trend.map(item => item.sentiment),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Sentiment Trend Over Time'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Sentiment Score'
        }
      }
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Sentiment Trend</h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default SentimentTrendChart;
