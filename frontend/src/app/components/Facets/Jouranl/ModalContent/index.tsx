/**
 *
 * ModalContent
 *
 */
import React, { useState } from 'react';
import { TextField, Button, List, ListItem, Checkbox } from '@mui/material';

// Modal Content component
const ModalContent = ({
  completionCriteria,
  checklistData,
  unitCategory,
  unit,
  customUnit,
  entries,
  onSubmit,
  handleClose = () => {
    console.log('Called');
  },
}) => {
  const [numericValue, setNumericValue] = useState(
    entries.length > 0 ? entries[0].numericValue : null,
  );
  const [tasks, setTasks] = useState(checklistData);

  // Handle numeric value change
  const handleNumericChange = event => {
    setNumericValue(event.target.value);
  };

  // Handle task completion toggle
  const handleTaskCompletionToggle = index => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Render inputs based on the completion criteria
  const renderContent = () => {
    switch (completionCriteria) {
      case 'numeric':
        return (
          <>
            <TextField
              label="Numeric Value"
              type="number"
              fullWidth
              value={numericValue}
              onChange={handleNumericChange}
              margin="normal"
            />
            <TextField
              label="Unit Category"
              fullWidth
              value={unitCategory}
              margin="normal"
            />

            {unitCategory !== 'custom' && (
              <TextField
                label="Unit"
                fullWidth
                value={unit}
                margin="normal"
              ></TextField>
            )}

            {unitCategory === 'custom' && (
              <TextField
                label="Custom Unit"
                fullWidth
                value={customUnit}
                margin="normal"
              />
            )}
          </>
        );

      case 'checklist':
        return (
          <>
            <List>
              {tasks.map((task, index) => (
                <ListItem
                  key={index}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <Checkbox
                    checked={task.completed}
                    onChange={() => handleTaskCompletionToggle(index)}
                  />
                  {task.task}
                </ListItem>
              ))}
            </List>
          </>
        );

      default:
        return <p>No criteria selected.</p>;
    }
  };

  return (
    <div>
      {renderContent()}
      <Button
        onClick={() => {
          onSubmit({
            numericValue,
            unitCategory,
            unit: unitCategory !== 'custom' ? unit : customUnit,
            checklist: tasks,
          });
          handleClose();
        }}
        variant="contained"
        color="primary"
        style={{ marginTop: '20px' }}
      >
        Submit
      </Button>
    </div>
  );
};

export default ModalContent;
