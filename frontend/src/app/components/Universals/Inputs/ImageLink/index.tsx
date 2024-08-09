import { TextField, Button } from '@mui/material';
import React, { useState } from 'react';

export default function ImageLink({ onSubmit }) {
  const [url, setUrl] = useState('');
  return (
    <div style={{ display: 'flex' }}>
      <TextField
        type="url"
        placeholder="Image URL"
        size="small"
        sx={{ mr: 2 }}
        onChange={e => {
          setUrl(e.target.value);
        }}
      />
      <Button
        variant="contained"
        onClick={() => {
          onSubmit(url);
        }}
      >
        Submit
      </Button>
    </div>
  );
}
