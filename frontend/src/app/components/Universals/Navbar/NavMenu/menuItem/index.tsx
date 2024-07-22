import React from 'react';
import { Typography, useTheme } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../index.css';
import { Link } from 'react-router-dom';

export default function MenuItem({ item }) {
  const theme: any = useTheme();
  return (
    <div className="menu-item">
      <Link to={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="menu-item-container">
          <Typography
            sx={{
              color: theme.palette.primary.contrastText,
              fontFamily: theme.typography.body1.fontFamily,
              fontWeight: theme.typography.body1.fontWeight,
              fontSize: theme.typography.body1.fontSize,
              ':hover': {
                color: 'secondary.main', // theme.palette.primary.main
              },
            }}
            className="navbar-menu-item"
          >
            {item.title}
          </Typography>
          {item?.child && <ExpandMoreIcon fontSize="small" />}
        </div>
      </Link>
      {item?.child ? (
        <div
          className="menu-item-content"
          style={{ backgroundColor: theme.palette.primary.dark }}
        >
          {item.child.map(child => {
            return (
              <Link
                key={item.url}
                to={item.url}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <div className="menu-subitem">
                  <Typography
                    sx={{
                      color: theme.palette.primary.contrastText,
                      fontFamily: theme.typography.primary.fontFamily,
                      fontWeight: theme.typography.primary.fontWeight,
                      fontSize: theme.typography.primary.fontSize,
                      ':hover': {
                        color: 'secondary.main', // theme.palette.primary.main
                      },
                    }}
                  >
                    {child.title}
                  </Typography>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
