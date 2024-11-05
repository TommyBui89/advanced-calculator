import React from 'react';
import { Line } from 'react-chartjs-2';
import './CryptoLineChart.css';

const CryptoLineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];

  coinHistory?.data?.history.forEach((history) => {
    coinPrice.push(history.price);
    coinTimestamp.push(new Date(history.timestamp * 1000).toLocaleDateString());
  });

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
        tension: 0.1, // Smooth line curve
      },
    ],
  };

  const options = {
    maintainAspectRatio: false, // Disable aspect ratio to allow manual resizing
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Price (USD)',
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <Line data={data} options={options} />
    </div>
  );
};

export default CryptoLineChart;
