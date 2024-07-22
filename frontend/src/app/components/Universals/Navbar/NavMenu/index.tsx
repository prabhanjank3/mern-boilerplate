/**
 *
 * NavMenu
 *
 */

import React from 'react';
import MenuItem from './menuItem';
import './index.css';

export default function NavMenu({ menulist }) {
  return (
    <div className="menu-container">
      {menulist.map(item => {
        return <MenuItem key={Math.random() * 1000} item={item} />;
      })}
    </div>
  );
}
