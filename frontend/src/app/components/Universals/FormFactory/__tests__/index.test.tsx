import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DynamicForm from '..';
import { FormConfig } from 'types/InputProps/dynamicForm';

describe('DynamicForm', () => {
  const mockOnSubmit = jest.fn();

  const formConfig: FormConfig = {
    fields: [
      { name: 'textField', label: 'Text Field', type: 'text', required: true },
      {
        name: 'emailField',
        label: 'Email Field',
        type: 'email',
        required: true,
      },
      {
        name: 'numberField',
        label: 'Number Field',
        type: 'number',
        required: false,
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders all form fields', () => {
    render(<DynamicForm config={formConfig} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Text Field')).toBeInTheDocument();
    expect(screen.getByLabelText('Email Field')).toBeInTheDocument();
    expect(screen.getByLabelText('Number Field')).toBeInTheDocument();
    expect(screen.getByLabelText('Select Field')).toBeInTheDocument();
    expect(screen.getByLabelText('Date Field')).toBeInTheDocument();
    expect(screen.getByLabelText('Time Field')).toBeInTheDocument();
    expect(screen.getByLabelText('File Field')).toBeInTheDocument();
  });

  it.skip('renders required indicators for required fields', () => {
    render(<DynamicForm config={formConfig} onSubmit={mockOnSubmit} />);

    expect(screen.getByLabelText('Text Field')).toBeRequired();
    expect(screen.getByLabelText('Email Field')).toBeRequired();
    expect(screen.getByLabelText('Select Field')).toBeRequired();
    expect(screen.getByLabelText('Date Field')).toBeRequired();
    expect(screen.getByLabelText('File Field')).toBeRequired();
    expect(screen.getByLabelText('Number Field')).not.toBeRequired();
    expect(screen.getByLabelText('Time Field')).not.toBeRequired();
  });

  it.skip('submits form data correctly', async () => {
    render(<DynamicForm config={formConfig} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Text Field'), {
      target: { value: 'Test Text' },
    });
    fireEvent.change(screen.getByLabelText('Email Field'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Number Field'), {
      target: { value: '123' },
    });

    fireEvent.mouseDown(screen.getByLabelText('Select Field'));
    fireEvent.click(screen.getByText('Option 2'));

    fireEvent.change(screen.getByLabelText('Date Field'), {
      target: { value: '2024-08-19' },
    });
    fireEvent.change(screen.getByLabelText('Time Field'), {
      target: { value: '10:00' },
    });

    // Mock file input
    const file = new File(['test'], 'test-file.txt', { type: 'text/plain' });
    fireEvent.change(screen.getByLabelText('File Field'), {
      target: { files: [file] },
    });

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        textField: 'Test Text',
        emailField: 'test@example.com',
        numberField: '123',
        selectField: 'option1',
        dateField: '2024-08-19',
        timeField: '10:00',
        fileField: expect.any(File),
      });
    });
  });

  it.skip('displays validation errors for required fields', async () => {
    render(<DynamicForm config={formConfig} onSubmit={mockOnSubmit} />);

    fireEvent.click(screen.getByText('Submit'));

    await waitFor(() => {
      expect(screen.getByText('Text Field is required')).toBeInTheDocument();
      expect(screen.getByText('Email Field is required')).toBeInTheDocument();
      expect(screen.getByText('Select Field is required')).toBeInTheDocument();
      expect(screen.getByText('Date Field is required')).toBeInTheDocument();
      expect(screen.getByText('File Field is required')).toBeInTheDocument();
    });

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('renders custom grid sizes for fields', () => {
    const customConfig: FormConfig = {
      fields: [
        {
          name: 'textField',
          label: 'Text Field',
          type: 'text',
          grid: { lg: 6, md: 12 },
        },
      ],
    };

    render(<DynamicForm config={customConfig} onSubmit={mockOnSubmit} />);

    const gridItem = screen
      .getByLabelText('Text Field')
      .closest('.MuiGrid-item');
    expect(gridItem).toHaveClass('MuiGrid-grid-lg-6');
    expect(gridItem).toHaveClass('MuiGrid-grid-md-12');
  });

  it('calls the onChange function correctly', () => {
    render(<DynamicForm config={formConfig} onSubmit={mockOnSubmit} />);

    fireEvent.change(screen.getByLabelText('Text Field'), {
      target: { value: 'New Text' },
    });
    fireEvent.change(screen.getByLabelText('Email Field'), {
      target: { value: 'new@example.com' },
    });

    expect(screen.getByLabelText('Text Field')).toHaveValue('New Text');
    expect(screen.getByLabelText('Email Field')).toHaveValue('new@example.com');
  });

  it('supports number inputs', () => {
    render(<DynamicForm config={formConfig} onSubmit={mockOnSubmit} />);

    const numberInput = screen.getByLabelText('Number Field');
    fireEvent.change(numberInput, { target: { value: '42' } });
    expect(numberInput).toHaveValue(42);
  });

  it.skip('supports date inputs', () => {
    render(<DynamicForm config={formConfig} onSubmit={mockOnSubmit} />);

    const calendarIcon = screen.getByTestId('CalendarIcon');
    fireEvent.click(calendarIcon);

    const dayToSelect = screen.getByRole('gridcell', { name: '29' });
    fireEvent.click(dayToSelect);

    const input = screen.getAllByLabelText('Date Field') as HTMLInputElement[];
    expect(input[0].value).toBe('29-08-2024');
  });
});
