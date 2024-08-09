/**
 *
 * Apple
 *
 */
import * as React from 'react';
import Tiptap from '../Universals/Inputs/TiptapEditor';
import SelectField from '../Universals/Inputs/Dropdown';

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
      <Tiptap addHeadingNode />
    </div>
  );
}
