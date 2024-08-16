/**
 *
 * Apple
 *
 */
import * as React from 'react';
import SelectField from '../Universals/Inputs/Dropdown';
import TextFieldInput from '../Universals/Inputs/Text';
import TimeFieldInput from '../Universals/Inputs/Time';

export function Apple() {
  return (
    <div>
      <SelectField
        options={[
          { label: 'Something', value: '1' },
          { label: 'Something2', value: '2' },
        ]}
        name="Something"
        value="2"
        onChange={(name, value) => {
          console.log(name, value);
        }}
      />
      <TextFieldInput
        name="name"
        label="Label"
        onChange={(name, value) => {
          console.log(name, value);
        }}
        meta={{ isValid: false, messages: ['This is wrong'] }}
      />
      <TimeFieldInput
        name="time"
        label="time"
        onChange={(name, value) => {
          console.log(name, value);
        }}
        extraAttributes={{}}
        meta={{ isValid: false, messages: ['This is wrong'] }}
      />
    </div>
  );
}
