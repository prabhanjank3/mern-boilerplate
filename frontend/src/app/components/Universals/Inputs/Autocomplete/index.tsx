/**
 *
 * Autocomplete
 *
 */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import type {
  AutoCompleteProps,
  CustomOption,
} from 'types/InputProps/autocomplete';
import { styled } from '@mui/material/styles';

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  '& .MuiAutocomplete-inputRoot': {
    fontFamily: theme.typography.body2.fontFamily,
    fontSize: theme.typography.body2.fontSize,
    backgroundColor: 'white',
    // This matches the specificity of the default styles at https://github.com/mui-org/material-ui/blob/v4.11.3/packages/material-ui-lab/src/Autocomplete/Autocomplete.js#L90
    '&[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input:first-of-type': {
      // Default left padding is 6px
    },
  },
}));

const AutocompleteInputField = ({
  name,
  label,
  options,
  value = null,
  defaultValue,
  onChange,
  meta,
  extraAttributes,
}: AutoCompleteProps) => {
  return (
    <StyledAutocomplete
      size="small"
      isOptionEqualToValue={(option, value) =>
        (option as CustomOption).id === (value as CustomOption).id
      }
      value={value}
      onChange={(_event, newValue) => {
        onChange(
          name,
          (newValue as CustomOption | null)
            ? (newValue as CustomOption).id
            : null,
        );
      }}
      getOptionLabel={option => {
        return (option as CustomOption).value;
      }}
      defaultValue={
        (options ? options : []).filter(
          option => option.id === defaultValue?.id,
        )[0]?.value || null
      }
      id="controllable-states-demo"
      options={options}
      sx={{ width: '100%' }}
      {...extraAttributes}
      renderInput={params => (
        <TextField
          {...params}
          InputLabelProps={{
            style: {
              fontFamily: 'body2.fontFamily',
              fontSize: 'body2.fontSize',
            },
          }}
          label={label}
          fullWidth
          error={meta ? !meta.isValid : false}
          helperText={
            meta && meta?.messages?.length > 0 ? meta.messages[0] : ''
          }
        />
      )}
    />
  );
};

export default AutocompleteInputField;
