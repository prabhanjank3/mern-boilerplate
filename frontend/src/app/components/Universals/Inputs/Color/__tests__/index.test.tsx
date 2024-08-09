import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ColorPicker from '..';

describe('ColorPicker', () => {
  test('renders without crashing', () => {
    const { getByText } = render(
      <ColorPicker
        name="color"
        color="#fff"
        onChange={() => {}}
        faceComponent={<span>Color Picker</span>}
      />,
    );
    expect(getByText('Color Picker')).toBeInTheDocument();
  });

  test('opens color picker on click', async () => {
    const { getByText, getByRole } = render(
      <ColorPicker
        name="color"
        color="#fff"
        onChange={() => {}}
        faceComponent={<span>Color Picker</span>}
      />,
    );
    const faceComponent = getByText('Color Picker');
    fireEvent.click(faceComponent);

    const colorDiv = getByRole('presentation');
    expect(colorDiv).toBeInTheDocument();
  });

  test('calls onChange with correct color', async () => {
    const onChange = jest.fn();
    const { getByText, getByTitle, getByRole } = render(
      <ColorPicker
        name="color"
        color="#fff"
        onChange={onChange}
        faceComponent={<span>Color Picker</span>}
      />,
    );
    const faceComponent = getByText('Color Picker');
    fireEvent.click(faceComponent);

    const colorDiv = getByRole('presentation');
    expect(colorDiv).toBeInTheDocument();

    const colorButton = getByTitle('#F44336');
    fireEvent.click(colorButton);
    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('color', '#f44336');
    });
  });
});
