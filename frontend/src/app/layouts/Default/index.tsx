/**
 *
 * Default
 *
 */
import * as React from 'react';
import Navbar from 'app/components/Universals/Navbar';
import Footer from 'app/components/Universals/Footer';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import './index.css';

export default function DefaultLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <Box className="main-content" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}
