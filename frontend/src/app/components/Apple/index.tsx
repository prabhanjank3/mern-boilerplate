/**
 *
 * Apple
 *
 */
import * as React from 'react';
import AutocompleteInputField from '../Universals/Inputs/Autocomplete';
import DateFieldInput from '../Universals/Inputs/Date';

export function Apple() {
  const options = [
    { id: '1', value: 'Something' },
    { id: '2', value: 'Another Something' },
  ];
  return (
    <div>
      <AutocompleteInputField
        label="Select Category"
        name="category"
        onChange={() => {}}
        options={options}
        value={options[1]}
      />
      <DateFieldInput
        name="date"
        inputFormat="YYYY-MM-DD"
        label="Date"
        onChange={(name, value) => {
          console.log(name, value);
        }}
        value={new Date(new Date('09/11/1996').toLocaleDateString('en-IN'))}
      />
    </div>
  );
}
