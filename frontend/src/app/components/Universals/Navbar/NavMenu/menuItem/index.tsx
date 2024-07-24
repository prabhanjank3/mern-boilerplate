import React from 'react';
import { Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../index.css';
import { Link } from 'react-router-dom';

export default function MenuItem({ item }) {
  return (
    <div className="menu-item">
      <Link to={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div className="menu-item-container">
          <Typography
            sx={{
              color: 'primary.contrastText',
              fontFamily: 'body1.fontFamily',
              fontWeight: 'body1.fontWeight',
              fontSize: 'body1.fontSize',
              ':hover': {
                color: 'secondary.main',
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
          style={{ backgroundColor: 'primary.dark' }}
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
                      color: 'primary.contrastText',
                      fontFamily: 'primary.fontFamily',
                      fontWeight: 'primary.fontWeight',
                      fontSize: 'primary.fontSize',
                      ':hover': {
                        color: 'secondary.main',
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
