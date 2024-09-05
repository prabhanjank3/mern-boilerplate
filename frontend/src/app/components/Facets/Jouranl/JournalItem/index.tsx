/**
 *
 * JournalItem
 *
 */
import React, { useState } from 'react';
import { Grid, Typography, IconButton, Box } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const HabitItem = ({ name }) => {
  const [status, setStatus] = useState<string | null>(null);

  const toggleStatus = () => {
    if (status === null) {
      setStatus('completed');
    } else if (status === 'completed') {
      setStatus('notCompleted');
    } else {
      setStatus(null);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        marginBottom: '10px',
      }}
    >
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12} sm={6} lg={9}>
          <Typography variant="h6">{name}</Typography>
        </Grid>
        <Grid item xs={12} sm={3} sx={{ textAlign: 'right' }}>
          <IconButton onClick={toggleStatus}>
            {status === 'completed' && <CheckCircleIcon color="success" />}
            {status === 'notCompleted' && <CancelOutlinedIcon color="error" />}
            {status === null && <CheckCircleOutlineIcon />}
          </IconButton>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HabitItem;
