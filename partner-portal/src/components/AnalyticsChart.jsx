import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const AnalyticsChart = ({ type, data, options = {} }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext('2d');

    chartInstance.current = new Chart(ctx, {
      type,
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: options.title || '',
          },
        },
        ...options,
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, options]);

  return (
    <div className="relative h-[300px] md:h-[400px]">
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export const DonationChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Food Donations (kg)',
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: '#2ecc71',
        borderColor: '#27ae60',
        borderWidth: 1,
      },
    ],
  };

  return (
    <AnalyticsChart
      type="bar"
      data={data}
      options={{
        title: 'Monthly Food Donations',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Quantity (kg)',
            },
          },
        },
      }}
    />
  );
};

export const BookingChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Bookings',
        data: [30, 45, 35, 50, 40, 60],
        backgroundColor: '#e67e22',
        borderColor: '#d35400',
        borderWidth: 1,
      },
    ],
  };

  return (
    <AnalyticsChart
      type="line"
      data={data}
      options={{
        title: 'Monthly Bookings',
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Number of Bookings',
            },
          },
        },
      }}
    />
  );
};

export const ImpactChart = () => {
  const data = {
    labels: ['Orphanages', 'Shelters', 'Food Banks', 'Others'],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ['#2ecc71', '#e67e22', '#3498db', '#95a5a6'],
      },
    ],
  };

  return (
    <AnalyticsChart
      type="doughnut"
      data={data}
      options={{
        title: 'Distribution of Donations',
      }}
    />
  );
};

export default AnalyticsChart;
