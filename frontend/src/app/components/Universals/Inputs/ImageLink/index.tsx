import { TextField } from '@mui/material';
import React, { useState } from 'react';
import { ImageLinkFieldProps } from 'types/InputProps/imageLink';

export default function ImageLink({
  name,
  onChange,
  preview = false,
  value,
}: ImageLinkFieldProps) {
  const [url, setUrl] = useState<string | null>(null);
  return (
    <div style={{ display: 'flex' }}>
      <TextField
        type="url"
        placeholder="Image URL"
        size="small"
        value={value || url}
        onChange={e => {
          const changeUrl = e.target.value;
          setUrl(changeUrl);
          onChange(name, e.target.value);
        }}
      />
      {preview && url && <img src={url} alt="name" />}
    </div>
  );
}
