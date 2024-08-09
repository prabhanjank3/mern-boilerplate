/**
 *
 * Popover
 *
 */
import * as React from 'react';
import { Popover } from '@mui/material';

interface Props {
  faceComponent: React.ReactNode;
  component: React.ReactNode;
}

export default function PopoverComponent({ faceComponent, component }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <span onClick={handleClick}>{faceComponent}</span>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        {component}
      </Popover>
    </>
  );
}
