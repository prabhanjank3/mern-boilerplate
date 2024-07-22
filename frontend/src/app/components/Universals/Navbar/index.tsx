/**
 *
 * Navbar
 *
 */
/* eslint-disable no-console */
import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import './index.css';
import PORTALDATA from 'variables/application-metadata';
import Menudata from 'variables/navbarMenu';
import NavMenu from './NavMenu/index';
import { Link, useNavigate } from 'react-router-dom';
// import BasicMenu from 'universals/components/menu';
// import { logout } from 'store/slices/users';
// import { useSelector } from 'react-redux';
// import Avatar from '@mui/material/Avatar';

export default function Navbar() {
  const theme: any = useTheme();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const { loggedInUser: user } = useSelector((state: any) => state.user);
  // const handleUserActionsChange = (e, value) => {
  //   if (value === 'LOGOUT') {
  //     dispatch(logout());
  //   }
  // };
  return (
    <Box
      sx={{
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
      className="navbar-container"
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <PORTALDATA.Logo sx={{ marginRight: '5px' }} />
        <div
          onClick={() => {
            navigate('/');
          }}
        >
          <Typography
            sx={{
              fontSize: theme.typography.logo.fontSize,
              fontFamily: theme.typography.logo.fontFamily,
              fontWeight: theme.typography.logo.fontWeight,
            }}
          >
            {PORTALDATA.name}
          </Typography>
          <Typography sx={{ fontSize: '11px' }}>
            {PORTALDATA.subline}
          </Typography>
        </div>
      </div>
      {true && <NavMenu menulist={Menudata} />}
      <div style={{ marginLeft: 'auto' }}>
        {true ? (
          // <BasicMenu
          //   faceComponent={
          //     <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>
          //       {user?.firstname.charAt(0)}
          //     </Avatar>
          //   }
          //   options={[{ label: 'LOGOUT', value: 'LOGOUT' }]}
          //   handleChange={handleUserActionsChange}
          // />
          <div>Hello</div>
        ) : (
          <Link to={'/login'}>
            <Typography sx={{ color: theme.palette.secondary.main }}>
              Login
            </Typography>
          </Link>
        )}
      </div>
    </Box>
  );
}
