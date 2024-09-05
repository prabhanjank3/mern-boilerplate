/**
 *
 * Modal
 *
 */
import React, { useState } from 'react';
import { Modal, Box, Button } from '@mui/material';

const ReusableModal = ({ TriggerComponent, ModalContent }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div onClick={handleOpen}>{TriggerComponent}</div>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 4,
            boxShadow: 24,
          }}
        >
          {ModalContent}
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Modal>
    </>
  );
};

export default ReusableModal;
