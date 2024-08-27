/**
 *
 * File
 *
 */
import * as React from 'react';
import { Box } from '@mui/material';
import { useRef } from 'react';
import TextField from '@mui/material/TextField';
import { InputAdornment, IconButton, useTheme } from '@mui/material';
import { FileFieldProps } from 'types/InputProps/file';

export default function FileField({
  name,
  value,
  label,
  onChange,
  extraAttributes,
  meta,
}: FileFieldProps) {
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const theme = useTheme();
  return (
    <Box>
      <input
        style={{ display: 'none' }}
        ref={fileUploadRef}
        type="file"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          const files = e.target.files;
          if (files && files.length > 0) {
            onChange(name, files[0]);
          }
        }}
      />
      <Box
        onClick={() => {
          if (fileUploadRef?.current) fileUploadRef.current.click();
        }}
      >
        <TextField
          size="small"
          InputLabelProps={{
            shrink: true,
            style: {
              fontFamily: theme.typography.body2.fontFamily,
              fontSize: theme.typography.fontSize,
            },
          }}
          value={(value as File)?.name || 'No File Selected'}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton edge="start" color="primary">
                  <button>Choose File</button>
                </IconButton>
              </InputAdornment>
            ),
            style: {
              fontFamily: theme.typography.body2.fontFamily,
              fontSize: theme.typography.body2.fontSize,
            },
          }}
          label={label}
          error={meta ? !meta.isValid : false}
          helperText={
            meta && meta?.messages?.length > 0 ? meta.messages[0] : ''
          }
          fullWidth
          onClick={e => {
            e.preventDefault();
          }}
          {...extraAttributes}
        />
      </Box>
    </Box>
  );
}
