import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SelectField from '..';
import { SelectProps } from 'types/InputProps/select';

// Mock data for the test
const options = [
  { value: 'option1', label: 'Option 1' },
  {
    value: 'option2',
    label: 'Option 2',
    icon: <span data-testid="icon">icon</span>,
  },
];

const mockOnChange = jest.fn();

const defaultProps: SelectProps = {
  name: 'test-select',
  options,
  onChange: mockOnChange,
  placeholder: 'Select an option',
};

describe('SelectField Component', () => {
  it('renders without crashing', () => {
    render(<SelectField {...defaultProps} />);
    expect(screen.getByLabelText('Select an option')).toBeInTheDocument();
  });

  it('displays the placeholder', () => {
    render(<SelectField {...defaultProps} />);
    expect(screen.getByLabelText('Select an option')).toBeInTheDocument();
  });

  it('displays all options passed to it', () => {
    render(<SelectField {...defaultProps} />);
    fireEvent.mouseDown(screen.getByLabelText('Select an option'));
    options.forEach(option => {
      expect(screen.getByText(option.label)).toBeInTheDocument();
    });
  });

  it('calls onChange when an option is selected', () => {
    render(<SelectField {...defaultProps} />);

    fireEvent.mouseDown(screen.getByLabelText('Select an option'));
    fireEvent.click(screen.getByText('Option 2'));
    expect(mockOnChange).toHaveBeenCalledWith('test-select', 'option2');
  });

  it('displays the icon if provided in the options', () => {
    render(<SelectField {...defaultProps} />);
    fireEvent.mouseDown(screen.getByLabelText('Select an option'));
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('handles value changes correctly', async () => {
    render(<SelectField {...defaultProps} value="option2" />);
    expect(screen.getByDisplayValue('option2')).toBeInTheDocument();
    fireEvent.mouseDown(screen.getByLabelText('Select an option'));
    fireEvent.click(screen.getByText('Option 1'));
    expect(screen.getByDisplayValue('option1')).toBeInTheDocument();
    expect(mockOnChange).toHaveBeenCalledWith('test-select', 'option1');
  });

  it('applies additional attributes correctly', () => {
    const { container } = render(
      <SelectField
        {...defaultProps}
        extraAttributes={{ 'data-testid': 'custom-select' }}
      />,
    );
    expect(
      container.querySelector('[data-testid="custom-select"]'),
    ).toBeInTheDocument();
  });
});
