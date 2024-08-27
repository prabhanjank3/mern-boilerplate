import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AutocompleteInputField from '..';

describe('AutocompleteInputField', () => {
  const defaultProps = {
    name: 'Test',
    label: 'Test Autocomplete',
    options: [
      { id: '1', value: 'Option 1' },
      { id: '2', value: 'Option 2' },
    ],
    onChange: jest.fn(),
    meta: {
      isValid: true,
      messages: [],
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with default props', () => {
    render(<AutocompleteInputField {...defaultProps} />);
    expect(screen.getByLabelText('Test Autocomplete')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
  });

  it('renders with a custom value', () => {
    render(
      <AutocompleteInputField
        {...defaultProps}
        value={defaultProps.options[1]}
      />,
    );
    expect(screen.getByDisplayValue('Option 2')).toBeInTheDocument();
  });

  it('calls onChange when a new option is selected', async () => {
    render(<AutocompleteInputField {...defaultProps} />);
    const input = screen.getByLabelText('Test Autocomplete');
    fireEvent.change(input, { target: { value: 'Option 2' } });
    fireEvent.click(screen.getByText('Option 2'));

    await waitFor(() => {
      expect(screen.getByDisplayValue('Option 2')).toBeInTheDocument();
    });

    expect(defaultProps.onChange).toHaveBeenCalledWith(defaultProps.options[1]);
  });

  it('sets default value on initial render if value is not provided', () => {
    render(<AutocompleteInputField {...defaultProps} />);
    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();
  });

  it('updates value when valueProp changes', () => {
    const { rerender } = render(
      <AutocompleteInputField
        {...defaultProps}
        value={defaultProps.options[0]}
      />,
    );
    expect(screen.getByDisplayValue('Option 1')).toBeInTheDocument();

    rerender(
      <AutocompleteInputField
        {...defaultProps}
        value={defaultProps.options[1]}
      />,
    );
    expect(screen.getByDisplayValue('Option 2')).toBeInTheDocument();
  });

  it('renders the placeholder label if provided', () => {
    render(<AutocompleteInputField {...defaultProps} />);
    expect(screen.getByLabelText('Test Autocomplete')).toBeInTheDocument();
  });

  it('applies extra attributes to the autocomplete element', () => {
    const extraAttributes = { 'data-testid': 'custom-autocomplete' };
    render(
      <AutocompleteInputField
        {...defaultProps}
        extraAttributes={extraAttributes}
      />,
    );
    expect(screen.getByTestId('custom-autocomplete')).toBeInTheDocument();
  });

  it('displays error state when meta.isValid is false', () => {
    render(
      <AutocompleteInputField
        {...defaultProps}
        meta={{ isValid: false, messages: ['Error message'] }}
      />,
    );
    expect(screen.getByText('Error message')).toBeInTheDocument();
  });
});
