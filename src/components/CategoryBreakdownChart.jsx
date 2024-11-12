import React from 'react';
import { Bar } from 'react-chartjs-2';

function CategoryBreakdownChart({ breakdown }) {
  const data = {
    labels: Object.keys(breakdown),
    datasets: [
      {
        label: 'Average Sentiment',
        data: Object.values(breakdown).map(item => item.average_sentiment),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
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
        text: 'Sentiment by Category'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Average Sentiment'
        }
      }
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Category Breakdown</h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}

export default CategoryBreakdownChart;
