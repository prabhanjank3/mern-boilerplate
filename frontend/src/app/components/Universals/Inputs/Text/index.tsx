/**
 *
 * Textfield
 *
 */
import * as React from 'react';

import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material';
import { TextFieldProps } from 'types/InputProps/text';

const TextFieldInput = ({
  name,
  value,
  label,
  defaultValue,
  onChange,
  extraAttributes,
  meta,
  ...rest
}: TextFieldProps) => {
  const theme = useTheme();
  return (
    <TextField
      size="small"
      InputProps={{
        style: {
          fontFamily: theme.typography.body2.fontFamily,
          fontSize: theme.typography.body2.fontSize,
        },
      }}
      InputLabelProps={{
        style: {
          fontFamily: theme.typography.body1.fontFamily,
          fontSize: theme.typography.body1.fontSize,
        },
      }}
      name={name}
      defaultValue={defaultValue}
      value={value}
      label={label}
      error={meta ? !meta.isValid : false}
      helperText={meta && meta?.messages?.length > 0 ? meta.messages[0] : ''}
      fullWidth
      {...extraAttributes}
      {...rest}
      onChange={event => {
        onChange(name, event.target.value);
      }}
    />
  );
};
export default TextFieldInput;
