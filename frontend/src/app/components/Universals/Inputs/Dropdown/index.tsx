/**
 *
 * Dropdown
 *
 */
import React, { useEffect, useState } from 'react';
import {
  Select,
  MenuItem,
  SelectChangeEvent,
  styled,
  useTheme,
} from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { SelectProps } from 'types/InputProps/select';
import { ReactI18NextChild } from 'react-i18next';

const StyledBox = styled('div')(({ theme }) => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingTop: theme.spacing(1),
  };
});

const StyledSelect = styled(Select)(({ theme }) => ({
  '& .MuiInputBase-input': {
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    backgroundColor: 'white',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
    },
  },
}));

export default function SelectField({
  name,
  options,
  label,
  value: valueProp = null,
  onChange,
  placeholder,
  extraAttributes = {},
}: SelectProps) {
  const [value, setValue] = useState(options[0]?.value);
  const theme = useTheme();
  useEffect(() => {
    setValue(valueProp ? valueProp : options[0]?.value);
  }, [valueProp, options]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value);
    onChange(name, event.target.value);
  };

  const labelId = `${name}-label`;
  return (
    <>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <StyledSelect
        labelId={labelId}
        size="small"
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        fullWidth
        value={valueProp || value}
        inputProps={{
          style: {
            fontFamily: theme.typography.body2.fontFamily,
            fontSize: theme.typography.body2.fontSize,
          },
        }}
        {...(extraAttributes as Object)}
      >
        {options.map(option => {
          return (
            <MenuItem key={option.value} value={option.value}>
              <div style={{ display: 'flex' }}>
                {option?.icon && <StyledBox>{option?.icon}</StyledBox>}
                <div>{option.label as ReactI18NextChild}</div>
              </div>
            </MenuItem>
          );
        })}
      </StyledSelect>
    </>
  );
}
