import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Tiptap, { editor } from '../..';

describe('EditorMenu', () => {
  // Needs a fix
  test('initial content is loaded', async () => {
    render(<Tiptap initialContent="Hello World!" />);
    const initialContent = await screen.findByText('Hello World!');

    await waitFor(() => {
      expect(initialContent).toBeInTheDocument();
    });
  });

  test('toggles bold', () => {
    const { getByTestId } = render(<Tiptap initialContent="Hello World!" />);
    const boldButton = getByTestId('FormatBoldIcon');

    fireEvent.click(boldButton);

    expect(editor?.isActive('bold')).toBe(true);
  });

  test('toggles italic', () => {
    const { getByTestId } = render(<Tiptap />);
    const italicButton = getByTestId('FormatItalicIcon');

    fireEvent.click(italicButton);

    expect(editor?.isActive('italic')).toBe(true);
  });

  test('toggles underline', () => {
    const { getByTestId } = render(<Tiptap />);
    const underlineButton = getByTestId('FormatUnderlinedRoundedIcon');

    fireEvent.click(underlineButton);

    expect(editor?.isActive('underline')).toBe(true);
  });

  test('changes text color', async () => {
    const { getByTestId, getByTitle } = render(<Tiptap />);
    const colorButtonIcon = getByTestId('FormatColorTextIcon');

    fireEvent.click(colorButtonIcon);

    const colorButton = getByTitle('#F44336');
    fireEvent.click(colorButton);
    await waitFor(() => {
      expect(editor?.getAttributes('textStyle').color).toBe('#f44336');
    });
  });

  test('changes highlight color', async () => {
    const { getByTestId, getByTitle } = render(<Tiptap />);

    const highlightButton = getByTestId('FormatColorFillRoundedIcon');

    fireEvent.click(highlightButton);

    const colorButton = getByTitle('#F44336');
    fireEvent.click(colorButton);
    await waitFor(() => {
      expect(editor?.getAttributes('highlight').color).toBe('#f44336');
    });
  });
});
