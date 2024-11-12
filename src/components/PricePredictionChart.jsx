import React from 'react';
import { Line } from 'react-chartjs-2';

function PricePredictionChart({ predictions }) {
  const data = {
    labels: Array.from({length: predictions.length}, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        label: 'Price Predictions',
        data: predictions,
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
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
        text: 'Stock Price Predictions (Next 30 Days)'
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value, index, values) {
            return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
          }
        },
        title: {
          display: true,
          text: 'Predicted Price'
        }
      }
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-semibold mb-4">Price Predictions</h3>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default PricePredictionChart;
