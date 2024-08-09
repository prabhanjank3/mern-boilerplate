// AutocompleteInputField.test.tsx
import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AutocompleteInputField from '..';
import type { CustomOption } from 'types/InputProps/autocomplete';

const mockOptions: CustomOption[] = [
  { id: '1', value: 'Option 1' },
  { id: '2', value: 'Option 2' },
  { id: '3', value: 'Option 3' },
];

describe('AutocompleteInputField', () => {
  it('renders without crashing', () => {
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        meta={{ isValid: true, messages: [] }}
      />,
    );
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('displays options when typing', () => {
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        meta={{ isValid: true, messages: [] }}
      />,
    );
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'Option' } });
    mockOptions.forEach(option => {
      expect(screen.getByText(option.value)).toBeInTheDocument();
    });
  });

  it('calls onChange with correct values when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={mockOptions}
        value={null}
        onChange={handleChange}
        meta={{ isValid: true, messages: [] }}
      />,
    );
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'Option 1' } });
    fireEvent.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith('test', '1');
  });

  it('displays error message when meta is invalid', () => {
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        meta={{ isValid: false, messages: ['Error message'] }}
      />,
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });

  it('displays default value correctly', () => {
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={mockOptions}
        value={mockOptions[0]}
        onChange={jest.fn()}
        defaultValue={mockOptions[0]}
        meta={{ isValid: true, messages: [] }}
      />,
    );
    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
  });

  it('is case insensitive when displaying options', () => {
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        meta={{ isValid: true, messages: [] }}
      />,
    );
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'option' } });
    mockOptions.forEach(option => {
      expect(screen.getByText(option.value)).toBeInTheDocument();
    });
  });

  it('handles empty options gracefully', () => {
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={[]}
        value={null}
        onChange={jest.fn()}
        meta={{ isValid: true, messages: [] }}
      />,
    );
    const input = screen.getByLabelText('Test Label');
    fireEvent.change(input, { target: { value: 'Option' } });
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
  });

  it('handles null value prop correctly', () => {
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        meta={{ isValid: true, messages: [] }}
      />,
    );
    expect(screen.getByLabelText('Test Label')).toHaveValue('');
  });

  it('opens dropdown on click and calls onChange with correct values when an option is selected', async () => {
    const handleChange = jest.fn();
    render(
      <AutocompleteInputField
        name="test"
        label="Test Label"
        options={mockOptions}
        value={null}
        onChange={handleChange}
        meta={{ isValid: true, messages: [] }}
      />,
    );
    const input = screen.getByRole('button');
    fireEvent.click(input);
    fireEvent.click(screen.getByText('Option 1'));
    expect(handleChange).toHaveBeenCalledWith('test', '1');
  });
});
