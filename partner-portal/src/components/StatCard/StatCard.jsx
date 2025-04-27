import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { useTheme } from '@mui/material/styles';

export const StatCard = ({ title, value, trend, icon }) => {
  const theme = useTheme();

  const getTrendColor = () => {
    if (trend > 0) return theme.palette.success.main;
    if (trend < 0) return theme.palette.error.main;
    return theme.palette.text.secondary;
  };

  const getTrendIcon = () => {
    if (trend > 0) return <TrendingUpIcon sx={{ color: getTrendColor() }} />;
    if (trend < 0) return <TrendingDownIcon sx={{ color: getTrendColor() }} />;
    return null;
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" component="div">
          {icon}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ mb: 1 }}>
        {value}
      </Typography>
      {trend !== undefined && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {getTrendIcon()}
          <Typography
            variant="body2"
            sx={{
              color: getTrendColor(),
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default StatCard; 