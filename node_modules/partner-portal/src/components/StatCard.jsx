import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

export const StatCard = ({ title, value, trend }) => {
  const isPositive = trend === 'up';
  const trendColor = isPositive ? '#2ecc71' : '#e74c3c';
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;
  const valueStr = String(value);

  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" gutterBottom>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <TrendIcon sx={{ color: trendColor }} />
        <Typography
          variant="body2"
          sx={{ color: trendColor }}
        >
          {isPositive ? '+' : '-'}5%
        </Typography>
        <Typography variant="body2" color="text.secondary">
          vs last {valueStr.includes('₹') ? 'month' : 'period'}
        </Typography>
      </Box>
    </Paper>
  );
};
