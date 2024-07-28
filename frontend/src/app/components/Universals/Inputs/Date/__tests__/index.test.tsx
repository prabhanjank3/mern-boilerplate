import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import '@testing-library/jest-dom';
import DateFieldInput from '..';
import type { DateFieldProps } from 'types/InputProps/date';

describe('DateFieldInput', () => {
  const mockOnChange = jest.fn();

  const defaultProps: DateFieldProps = {
    name: 'testDate',
    value: new Date('2024-07-27'),
    label: 'Test Date',
    inputFormat: 'DD-MM-YYYY',
    defaultValue: new Date('2024-07-01'),
    extraAttributes: {},
    onChange: mockOnChange,
    meta: {
      isValid: true,
      messages: [],
    },
  };

  const renderComponent = (props = {}) =>
    render(
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateFieldInput {...defaultProps} {...props} />
      </LocalizationProvider>,
    );

  it('renders the DatePicker with correct label', () => {
    renderComponent();
    expect(screen.getByLabelText('Test Date')).toBeInTheDocument();
  });

  it('displays the correct default value', () => {
    renderComponent();
    const input = screen.getByLabelText('Test Date') as HTMLInputElement;
    expect(input.value).toBe('27-07-2024');
  });

  it('Changes date value and calls onChange with correct arguments when value changes', () => {
    renderComponent();

    const calendarIcon = screen.getByTestId('CalendarIcon');
    fireEvent.click(calendarIcon);

    const dayToSelect = screen.getByRole('gridcell', { name: '29' });
    fireEvent.click(dayToSelect);

    const input = screen.getAllByLabelText('Test Date') as HTMLInputElement[];
    expect(input[0].value).toBe('29-07-2024');

    expect(mockOnChange).toHaveBeenCalledWith('testDate', '29/7/2024');
  });

  it('displays the helper text when there are validation messages', () => {
    const invalidProps: DateFieldProps = {
      ...defaultProps,
      meta: {
        isValid: false,
        messages: ['Invalid date'],
      },
    };
    renderComponent(invalidProps);
    expect(screen.getByText('Invalid date')).toBeInTheDocument();
  });
});
