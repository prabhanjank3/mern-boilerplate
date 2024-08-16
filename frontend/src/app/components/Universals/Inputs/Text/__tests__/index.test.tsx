import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TextFieldInput from '..'; // Adjust the import based on your file structure
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

describe('TextFieldInput Component', () => {
  const mockOnChange = jest.fn();

  const renderComponent = (props = {}) => {
    return render(
      <ThemeProvider theme={theme}>
        <TextFieldInput
          name="testField"
          label="test"
          onChange={mockOnChange}
          {...props}
        />
      </ThemeProvider>,
    );
  };

  test('renders with default props', () => {
    renderComponent();
    const textField = screen.getByRole('textbox');
    expect(textField).toBeInTheDocument();
  });

  test('renders with label', () => {
    renderComponent({ label: 'Test Label' });
    const label = screen.getByLabelText('Test Label');
    expect(label).toBeInTheDocument();
  });

  test('renders with defaultValue', () => {
    renderComponent({ defaultValue: 'Default Value' });
    const textField = screen.getByDisplayValue('Default Value');
    expect(textField).toBeInTheDocument();
  });

  test('renders with value and handles change', () => {
    renderComponent({ value: 'Initial Value' });
    const textField = screen.getByDisplayValue('Initial Value');
    expect(textField).toBeInTheDocument();

    fireEvent.change(textField, { target: { value: 'New Value' } });
    expect(mockOnChange).toHaveBeenCalledWith('testField', 'New Value');
  });

  test('renders with error state and displays error message in a paragraph', () => {
    renderComponent({ meta: { isValid: false, messages: ['Error Message'] } });
    const errorParagraph = screen.getByText('Error Message');

    expect(errorParagraph).toBeInTheDocument();
    expect(errorParagraph).toHaveClass('Mui-error');
  });

  test('renders without error when meta is valid', () => {
    renderComponent({ meta: { isValid: true, messages: [] } });
    const textField = screen.getByRole('textbox');
    const helperText = screen.queryByText('Error Message');

    expect(textField).not.toHaveClass('Mui-error');
    expect(helperText).not.toBeInTheDocument();
  });
});
