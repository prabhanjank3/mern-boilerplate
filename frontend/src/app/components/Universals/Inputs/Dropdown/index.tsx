/**
 *
 * Dropdown
 *
 */
import React, { useEffect, useState } from 'react';
import { Select, MenuItem, SelectChangeEvent, styled } from '@mui/material';
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

const StyledSelect = styled(Select)({});

export default function SelectField({
  name,
  options,
  value: valueProp,
  onChange,
  placeholder,
  extraAttributes = {},
}: SelectProps) {
  const [value, setValue] = useState(valueProp || options[0]?.value);

  useEffect(() => {
    setValue(valueProp);
  }, [valueProp]);

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setValue(event.target.value);
    onChange(name, event.target.value);
  };

  const labelId = `${name}-label`;
  return (
    <>
      {placeholder && <InputLabel id={labelId}>{placeholder}</InputLabel>}
      <StyledSelect
        labelId={labelId}
        size="small"
        onChange={handleChange}
        name={name}
        value={value}
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
