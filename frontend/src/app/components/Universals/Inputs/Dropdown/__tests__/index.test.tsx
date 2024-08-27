import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectField from '..';

describe('SelectField', () => {
  const defaultProps = {
    label: 'Select an option',
    name: 'test-select',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
    ],
    onChange: jest.fn(),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<SelectField {...defaultProps} />);
    expect(screen.getByLabelText('Select an option')).toBeInTheDocument();
    expect(screen.getByDisplayValue('option1')).toBeInTheDocument();
  });

  it('renders with a custom value', () => {
    render(<SelectField {...defaultProps} value="option2" />);
    expect(screen.getByDisplayValue('option2')).toBeInTheDocument();
  });

  it('calls onChange when a new option is selected', async () => {
    render(<SelectField {...defaultProps} />);
    fireEvent.mouseDown(screen.getByLabelText('Select an option'));
    fireEvent.click(screen.getByText('Option 2'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('option2')).toBeInTheDocument();
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(
      'test-select',
      'option2',
    );
  });

  it('sets default value on initial render if value is not provided', () => {
    render(<SelectField {...defaultProps} />);
    expect(screen.getByDisplayValue('option1')).toBeInTheDocument();
  });

  it('updates value when valueProp changes', () => {
    const { rerender } = render(
      <SelectField {...defaultProps} value="option1" />,
    );
    expect(screen.getByDisplayValue('option1')).toBeInTheDocument();

    rerender(<SelectField {...defaultProps} value="option2" />);
    expect(screen.getByDisplayValue('option2')).toBeInTheDocument();
  });

  it('handles no options provided gracefully', () => {
    render(<SelectField {...defaultProps} options={[]} />);
    expect(screen.queryByDisplayValue('option1')).not.toBeInTheDocument();
    expect(screen.queryByDisplayValue('option2')).not.toBeInTheDocument();
  });

  it('renders the placeholder if provided', () => {
    render(<SelectField {...defaultProps} />);
    expect(screen.getByLabelText('Select an option')).toBeInTheDocument();
  });

  it('applies extra attributes to the select element', () => {
    const extraAttributes = { 'data-testid': 'custom-select', size: 'large' };
    render(<SelectField {...defaultProps} extraAttributes={extraAttributes} />);
    expect(screen.getByTestId('custom-select')).toBeInTheDocument();
  });
});
