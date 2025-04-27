import React from 'react';
import { Alert, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export const ErrorAlert = ({ message = 'An error occurred. Please try again.' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 2,
        width: '100%',
      }}
    >
      <Alert
        severity="error"
        icon={<ErrorOutlineIcon />}
        sx={{
          width: '100%',
          maxWidth: 600,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        {message}
      </Alert>
    </Box>
  );
};

export default ErrorAlert; 