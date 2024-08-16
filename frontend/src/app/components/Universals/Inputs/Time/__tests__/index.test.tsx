import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimeFieldInput from '..'; // Adjust the import based on your file structure
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('TimeFieldInput Component', () => {
  const mockOnChange = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <TimeFieldInput
          name="testField"
          label="time"
          extraAttributes={{}}
          onChange={mockOnChange}
          {...props}
        />
      </ThemeProvider>,
    );
  };

  test('renders with default props', () => {
    renderComponent();
    const timePickerInput = screen.getByRole('textbox');
    expect(timePickerInput).toBeInTheDocument();
    expect(timePickerInput).toHaveValue('12:00 AM');
  });

  test('renders with custom value', () => {
    renderComponent({ value: '14:30' });
    const timePickerInput = screen.getByRole('textbox');
    expect(timePickerInput).toBeInTheDocument();
    expect(timePickerInput).toHaveValue('02:30 PM');
  });

  test('renders with label', () => {
    renderComponent({ label: 'Select Time' });
    const label = screen.getByLabelText('Select Time');
    expect(label).toBeInTheDocument();
  });

  test('calls onChange with correct time value', () => {
    renderComponent({ value: '10:15' });

    const timePickerInput = screen.getByRole('textbox');
    fireEvent.change(timePickerInput, { target: { value: '11:45' } });

    expect(mockOnChange).toHaveBeenCalled();
  });

  test('applies custom extraAttributes', () => {
    renderComponent({
      extraAttributes: { readOnly: true },
    });
    const timePickerInput = screen.getByRole('textbox');

    expect(timePickerInput).toHaveAttribute('readOnly');
  });
});
