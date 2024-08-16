/**
 *
 * Time
 *
 */
import * as React from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TimeFieldProps } from 'types/InputProps/time';

const StyledTimeField = styled(TimePicker)(({ theme }) => ({
  '& .MuiInputBase-root': {
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
    },
  },
}));

const TimeFieldInput = ({
  name,
  value = '00:00',
  label,
  extraAttributes,
  onChange,
}: // meta,
TimeFieldProps) => {
  const theme = useTheme();
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledTimeField
        label={label}
        minutesStep={1}
        slotProps={{
          textField: {
            style: { fontFamily: theme.typography.body2.fontFamily },
            size: 'small',
            fullWidth: true,
            InputProps: {},
          },
        }}
        defaultValue={dayjs('2022-04-17T12:00')}
        value={dayjs('2022-04-17T' + value)}
        onChange={(e: Dayjs | null) => {
          onChange(name, e);
        }}
        {...extraAttributes}
      />
    </LocalizationProvider>
  );
};
export default TimeFieldInput;
