/**
 *
 * CompletionCriteria
 *
 */
import React from 'react';
import { Grid, TextField, MenuItem, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const HabitForm = ({ setFormData, formData }) => {
  const handleInputChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTask = () => {
    setFormData({
      ...formData,
      checklist: [...formData.checklist, { task: '' }],
    });
  };

  const handleDeleteTask = index => {
    const newChecklist = formData.checklist.filter((_, i) => i !== index);
    setFormData({ ...formData, checklist: newChecklist });
  };

  return (
    <Grid container spacing={2}>
      {/* Completion Criteria Dropdown */}
      <Grid item xs={12}>
        <TextField
          select
          fullWidth
          label="Completion Criteria"
          name="completionCriteria"
          value={formData.completionCriteria}
          onChange={handleInputChange}
        >
          <MenuItem value="yes_or_no">Yes or No</MenuItem>
          <MenuItem value="numeric">Numeric Value</MenuItem>
          <MenuItem value="checklist">Checklist</MenuItem>
        </TextField>
      </Grid>

      {/* Numeric Value and Unit Selection */}
      {formData.completionCriteria === 'numeric' && (
        <>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Numeric Value"
              name="numericValue"
              type="number"
              value={formData.numericValue}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              select
              fullWidth
              label="Unit Category"
              name="unitCategory"
              value={formData.unitCategory}
              onChange={handleInputChange}
            >
              <MenuItem value="distance">Distance</MenuItem>
              <MenuItem value="time">Time</MenuItem>
              <MenuItem value="weight">Weight</MenuItem>
              <MenuItem value="custom">Custom</MenuItem>
            </TextField>
          </Grid>

          {/* Unit Dropdown or Custom Unit TextField */}
          {formData.unitCategory !== 'custom' ? (
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="Unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
              >
                {formData.unitCategory === 'distance' && [
                  <MenuItem value="km">Kilometers</MenuItem>,
                  <MenuItem value="miles">Miles</MenuItem>,
                ]}
                {formData.unitCategory === 'time' && [
                  <MenuItem value="hours">Hours</MenuItem>,
                  <MenuItem value="minutes">Minutes</MenuItem>,
                  <MenuItem value="seconds">Minutes</MenuItem>,
                ]}
                {formData.unitCategory === 'weight' && [
                  <MenuItem value="kg">Kilograms</MenuItem>,
                  <MenuItem value="lbs">Pounds</MenuItem>,
                ]}
              </TextField>
            </Grid>
          ) : (
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Custom Unit"
                name="customUnit"
                value={formData.customUnit}
                onChange={handleInputChange}
              />
            </Grid>
          )}
        </>
      )}

      {/* Checklist Tasks */}
      {formData.completionCriteria === 'checklist' && (
        <>
          {formData.checklist.map((item, index) => (
            <Grid item xs={12} key={index} style={{ display: 'flex' }}>
              <TextField
                fullWidth
                label={`Task ${index + 1}`}
                name="task"
                value={item.task}
                onChange={e =>
                  setFormData({
                    ...formData,
                    checklist: formData.checklist.map((task, i) =>
                      i === index ? { task: e.target.value } : task,
                    ),
                  })
                }
              />
              <IconButton onClick={() => handleDeleteTask(index)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          ))}
          <Grid item xs={12}>
            <Button startIcon={<AddIcon />} onClick={handleAddTask}>
              Add Task
            </Button>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default HabitForm;
