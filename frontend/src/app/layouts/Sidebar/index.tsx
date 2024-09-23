/* eslint-disable no-unused-vars */
/**
 *
 * Sidebar
 *
 */
import {
  Avatar,
  Box,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
} from '@mui/material';
import * as React from 'react';
import { useState } from 'react';

// Reusable Sidebar Component
const Sidebar = ({
  menuItems,
  avatar,
  name,
  view,
  setView,
}: {
  menuItems: Array<{
    label: string;
    action: () => void;
    icon: React.ReactNode;
    key: string;
  }>;
  avatar: string;
  name: string;
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const theme = useTheme();
  return (
    <Grid
      item
      xs={3}
      lg={2}
      sx={{
        borderRight: '1px solid #ccc',
        padding: '16px',
        minHeight: '100vh',
        backgroundColor: '#F5F5F5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ECECEC',
          padding: 1,
        }}
      >
        <Avatar
          sx={{
            mr: 2,
            backgroundColor: '#679F37',
            width: 34,
            height: 34,
            fontSize: '14px',
          }}
        >
          {avatar}
        </Avatar>
        <Typography
          variant="h6"
          sx={{ fontFamily: theme.typography.body2.fontFamily }}
        >
          {name}
        </Typography>
      </Box>
      <List sx={{ fontFamily: theme.typography.body2.fontFamily }}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            onClick={item.action}
            sx={{ color: item.key === view ? 'secondary.main' : '' }}
          >
            <Box sx={{ mr: 2 }}>{item.icon}</Box>
            {item.label}
          </ListItem>
        ))}
      </List>
    </Grid>
  );
};

// Reusable Layout Component
const SidebarLayout = ({ views }) => {
  const [view, setView] = useState('dashboard');

  const menuItems = Object.keys(views).map(itemKey => {
    return {
      key: itemKey,
      label: views[itemKey].label,
      action: () => {
        setView(itemKey);
      },
      icon: views[itemKey].icon,
    };
  });

  return (
    <Grid container sx={{ alignItems: 'stretch' }}>
      <Sidebar
        menuItems={menuItems}
        view={view}
        setView={setView}
        avatar="OP" // You can pass dynamic avatar content
        name="Prabhanjan Kulkarni" // You can pass dynamic name
      />
      <Grid item xs={9} lg={10} style={{ padding: '16px' }}>
        {views[view]['component']} {/* Dynamically render the view */}
      </Grid>
    </Grid>
  );
};

export default SidebarLayout;
