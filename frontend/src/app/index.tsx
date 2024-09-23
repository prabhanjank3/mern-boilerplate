/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Apple } from './components/Apple';
import DefaultLayout from './layouts/Default';
import SidebarLayout from './layouts/Sidebar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Grid } from '@mui/material';
import Dashboard from './components/Facets/Dashboard';
import { TodayOutlined, SelfImprovementOutlined } from '@mui/icons-material';

const views = {
  dashboard: {
    label: "Today's To-Do",
    component: <Dashboard />,
    icon: <TodayOutlined />,
  },
  create: {
    label: 'Create New Habit',
    icon: <SelfImprovementOutlined />,
    component: (
      <Grid container>
        <div>Create</div>
      </Grid>
    ),
  },
};

export function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="" element={<Apple />} />
            <Route path="another" element={<>Another</>} />
          </Route>
          <Route path="/s" element={<SidebarLayout views={views} />}></Route>
        </Routes>
      </BrowserRouter>
    </LocalizationProvider>
  );
}
