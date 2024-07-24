/**
 *
 * Footer
 *
 */
import { Box, Typography } from '@mui/material';
import * as React from 'react';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center',
        minHeight: '50px',
        marginTop: 'auto',
      }}
    >
      <Typography sx={{ fontFamily: 'body2.fontFamily', fontSize: '12px' }}>
        {' '}
        {`© ${new Date().getFullYear()} Private Journal - Developed by Prabhanjan Kulkarni`}
      </Typography>
    </Box>
  );
}
