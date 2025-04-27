import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Paper, Typography, ButtonGroup, Button, Breadcrumbs, Link } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LineChart, BarChart } from '../components/Charts';
import { StatCard } from '../components/StatCard';
import apiService from '../utils/apiService';
import { Loading } from '../components/Loading';
import { ErrorAlert } from '../components/ErrorAlert';
import PartnerNavbar from '../components/PartnerNavbar';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import HomeIcon from '@mui/icons-material/Home';

const Analytics = () => {
  const theme = useTheme();
  const [timeframe, setTimeframe] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, [timeframe]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.get(`/analytics?timeframe=${timeframe}`);
      if (response && response.success) {
        setData(response.data);
      } else {
        setError('Failed to fetch analytics data');
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorAlert message={error} />;
  if (!data) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <PartnerNavbar />
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 3 }}>
          <Link
            underline="hover"
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/partner/dashboard"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            <AnalyticsIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Analytics
          </Typography>
        </Breadcrumbs>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Analytics Dashboard
        </Typography>
        <ButtonGroup variant="outlined" aria-label="timeframe selection">
          <Button
            onClick={() => setTimeframe('week')}
            variant={timeframe === 'week' ? 'contained' : 'outlined'}
          >
            Week
          </Button>
          <Button
            onClick={() => setTimeframe('month')}
            variant={timeframe === 'month' ? 'contained' : 'outlined'}
          >
            Month
          </Button>
          <Button
            onClick={() => setTimeframe('year')}
            variant={timeframe === 'year' ? 'contained' : 'outlined'}
          >
            Year
          </Button>
        </ButtonGroup>
      </Box>

      <Grid container spacing={3}>
        {/* Summary Stats */}
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Orders"
            value={data.totalOrders}
            trend={data.ordersTrend}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Total Revenue"
            value={`₹${data.totalRevenue.toLocaleString()}`}
            trend={data.revenueTrend}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Average Order Value"
            value={`₹${data.averageOrderValue.toLocaleString()}`}
            trend={data.aovTrend}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <StatCard
            title="Customer Satisfaction"
            value={`${data.customerSatisfaction}%`}
            trend={data.satisfactionTrend}
          />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Revenue Trend
            </Typography>
            <LineChart data={data.revenueTrendData} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 300,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Orders by Type
            </Typography>
            <BarChart data={data.ordersByType} />
          </Paper>
        </Grid>
      </Grid>
      </Container>
    </div>
  );
};

export default Analytics;
