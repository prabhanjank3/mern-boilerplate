/**
 * @file Universals/Inputs/date/index.tsx
 * Date
 */
import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';
import type { DateFieldProps } from 'types/InputProps/date';
import { useTheme } from '@mui/material';

const DateFieldInput = ({
  name,
  value,
  label,
  inputFormat = 'DD-MM-YYYY',
  defaultValue,
  extraAttributes,
  onChange,
  meta,
}: DateFieldProps) => {
  const theme = useTheme();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        {...extraAttributes}
        defaultValue={dayjs(defaultValue)}
        views={['year', 'month', 'day']}
        format={inputFormat}
        label={label}
        value={dayjs(value)}
        onChange={(newValue: Dayjs | null) => {
          onChange(name, newValue?.toDate()?.toLocaleDateString('en-IN'));
        }}
        slotProps={{
          textField: {
            fullWidth: true,
            size: 'small',
            error: meta ? !meta.isValid : false,
            helperText:
              meta && meta?.messages?.length > 0 ? meta.messages[0] : '',
            InputProps: {
              style: {
                fontFamily: theme.typography.body2.fontFamily,
                fontSize: theme.typography.body2.fontSize,
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
export default DateFieldInput;
