/**
 *
 * Navbar
 *
 */
/* eslint-disable no-console */
import { Box, Typography } from '@mui/material';
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
        backgroundColor: 'primary.main',
        color: 'primary.contrastText',
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
              fontSize: 'logo.fontSize',
              fontFamily: 'logo.fontFamily',
              fontWeight: 'logo.fontWeight',
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
            <Typography sx={{ color: 'secondary.main' }}>Login</Typography>
          </Link>
        )}
      </div>
    </Box>
  );
}
