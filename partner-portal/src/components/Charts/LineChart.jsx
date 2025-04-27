import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const LineChart = ({
  data,
  xKey,
  yKey,
  color,
  formatValue = (value) => value,
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey={xKey}
          tick={{ fill: 'rgba(0, 0, 0, 0.6)' }}
        />
        <YAxis
          tick={{ fill: 'rgba(0, 0, 0, 0.6)' }}
          tickFormatter={formatValue}
        />
        <Tooltip
          formatter={(value) => formatValue(value)}
          labelStyle={{ color: 'rgba(0, 0, 0, 0.87)' }}
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
          }}
        />
        <Line
          type="monotone"
          dataKey={yKey}
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, strokeWidth: 2 }}
          activeDot={{ r: 8 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

export default LineChart; 