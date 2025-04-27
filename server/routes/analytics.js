const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

// Helper function to generate mock data based on timeframe
const generateMockData = (timeframe) => {
  const now = new Date();
  const data = {
    totalOrders: Math.floor(Math.random() * 1000) + 100,
    totalRevenue: Math.floor(Math.random() * 100000) + 10000,
    averageOrderValue: Math.floor(Math.random() * 1000) + 100,
    customerSatisfaction: Math.floor(Math.random() * 20) + 80,
    ordersTrend: Math.random() > 0.5 ? 'up' : 'down',
    revenueTrend: Math.random() > 0.5 ? 'up' : 'down',
    aovTrend: Math.random() > 0.5 ? 'up' : 'down',
    satisfactionTrend: Math.random() > 0.5 ? 'up' : 'down',
    revenueTrendData: [],
    ordersByType: []
  };

  // Generate trend data
  const points = timeframe === 'week' ? 7 : timeframe === 'month' ? 30 : 12;
  const labels = timeframe === 'year' ? [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ] : Array.from({ length: points }, (_, i) => {
    const d = new Date(now);
    d.setDate(d.getDate() - (points - i - 1));
    return timeframe === 'week' ? 
      d.toLocaleDateString('en-US', { weekday: 'short' }) :
      d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  });

  data.revenueTrendData = labels.map(label => ({
    label,
    value: Math.floor(Math.random() * 10000) + 1000
  }));

  // Generate orders by type
  const businessTypes = ['Restaurant', 'Hotel', 'Function Hall', 'Sweet Shop'];
  data.ordersByType = businessTypes.map(type => ({
    label: type,
    value: Math.floor(Math.random() * 100) + 10
  }));

  return data;
};

// Get analytics data
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { timeframe = 'month' } = req.query;
    
    // Validate timeframe
    if (!['week', 'month', 'year'].includes(timeframe)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid timeframe. Must be week, month, or year'
      });
    }

    // TODO: Replace with actual data from database
    const data = generateMockData(timeframe);

    res.status(200).json({
      success: true,
      data
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics data',
      error: error.message
    });
  }
});

module.exports = router;
