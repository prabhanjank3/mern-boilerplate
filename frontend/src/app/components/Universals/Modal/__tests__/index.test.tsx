// ReusableModal.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ReusableModal from '..';
import { Button, Typography } from '@mui/material';

// Mock components to use as TriggerComponent and ModalContent
const TriggerComponent = <Button>Open Modal</Button>;
const ModalContent = <Typography>Modal is Open</Typography>;

describe('ReusableModal Component', () => {
  it('renders the trigger component', () => {
    render(
      <ReusableModal
        TriggerComponent={TriggerComponent}
        ModalContent={ModalContent}
      />,
    );

    // Verify that the trigger component (Open Modal button) is rendered
    const triggerButton = screen.getByText(/open modal/i);
    expect(triggerButton).toBeInTheDocument();
  });

  it('opens the modal when the trigger component is clicked', () => {
    render(
      <ReusableModal
        TriggerComponent={TriggerComponent}
        ModalContent={ModalContent}
      />,
    );

    // Click the trigger button to open the modal
    const triggerButton = screen.getByText(/open modal/i);
    fireEvent.click(triggerButton);

    // Verify that the modal content is rendered
    const modalContent = screen.getByText(/modal is open/i);
    expect(modalContent).toBeInTheDocument();
  });

  it('closes the modal when the close button is clicked', () => {
    render(
      <ReusableModal
        TriggerComponent={TriggerComponent}
        ModalContent={ModalContent}
      />,
    );

    // Open the modal
    const triggerButton = screen.getByText(/open modal/i);
    fireEvent.click(triggerButton);

    // Ensure the modal content is displayed
    const modalContent = screen.getByText(/modal is open/i);
    expect(modalContent).toBeInTheDocument();

    // Close the modal by clicking the close button
    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    // Verify that the modal content is not displayed anymore
    expect(modalContent).not.toBeInTheDocument();
  });

  it('does not display modal content when initially rendered', () => {
    render(
      <ReusableModal
        TriggerComponent={TriggerComponent}
        ModalContent={ModalContent}
      />,
    );

    // Verify that the modal content is not rendered initially
    const modalContent = screen.queryByText(/modal is open/i);
    expect(modalContent).not.toBeInTheDocument();
  });

  it('modal content remains after reopening', () => {
    render(
      <ReusableModal
        TriggerComponent={TriggerComponent}
        ModalContent={ModalContent}
      />,
    );

    // Open the modal
    const triggerButton = screen.getByText(/open modal/i);
    fireEvent.click(triggerButton);

    // Close the modal
    const closeButton = screen.getByText(/close/i);
    fireEvent.click(closeButton);

    // Reopen the modal
    fireEvent.click(triggerButton);

    // Verify that the modal content is displayed again
    const modalContent = screen.getByText(/modal is open/i);
    expect(modalContent).toBeInTheDocument();
  });
});
