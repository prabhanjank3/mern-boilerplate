import { FormConfig } from 'types/InputProps/dynamicForm';

export const formConfig: FormConfig = {
  fields: [
    { name: 'textField', label: 'Text Field', type: 'text', required: true },
    {
      name: 'emailField',
      label: 'Email Field',
      type: 'email',
      required: true,
      grid: { lg: 6, md: 6, sm: 6, xs: 12 },
    },
    {
      name: 'numberField',
      label: 'Number Field',
      type: 'number',
      required: false,
      grid: { lg: 6, md: 6, sm: 6, xs: 12 },
    },
    {
      name: 'selectField',
      label: 'Select Field',
      type: 'select',
      options: [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
      ],
      required: true,
    },
    { name: 'dateField', label: 'Date Field', type: 'date', required: true },
    { name: 'timeField', label: 'Time Field', type: 'time', required: false },
    { name: 'fileField', label: 'File Field', type: 'file', required: true },
  ],
};
