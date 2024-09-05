/* eslint-disable no-unused-vars */
/**
 *
 * HabitDetails
 *
 */
import React, { useState } from 'react';
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
  FormGroup,
  Divider,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { RRule } from 'rrule';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HabitCompletionForm from '../CompletionCriteria';
import { useAddHabitMutation } from 'store/querySlice/habit.slice';

type ChecklistItem = {
  task: string;
};

export type Habit = {
  id?: number;
  name: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  isArchived: boolean;
  description: string;
  category: 'Health' | 'Productivity' | 'Learning' | 'Fitness' | 'Other';
  priority: number;
  frequency: string;
  rawDaysOfYearInput: number | string;
  daysOfWeek: string[]; // e.g., ["MO", "TU", "WE"]
  daysOfMonth: number[]; // e.g., [1, 15, 30]
  daysOfYear: string[]; // e.g., ["2024-01-01", "2024-12-31"]
  xDays: number; // to store interval for "every_x_days"
  rrule: string;
  completionCriteria: 'yes_or_no' | 'numeric' | 'checklist'; // to specify the type of completion criteria
  numericValue: number; // e.g., "5"
  unitCategory: 'distance' | 'time' | 'weight' | 'custom' | ''; // unit category or empty if not selected
  unit: string; // e.g., "km", "hours", "kg"
  customUnit: string; // user-defined custom unit
  checklist: ChecklistItem[]; // e.g., [{ task: "Task 1" }, { task: "Task 2" }]
};

const HabitForm = () => {
  const [createHabit] = useAddHabitMutation();
  const [formData, setFormData] = useState<Habit>({
    name: '',
    startDate: null,
    endDate: null,
    isArchived: false,
    description: '',
    category: 'Other',
    priority: 1,
    frequency: '',
    rawDaysOfYearInput: 0,
    daysOfWeek: [],
    daysOfMonth: [],
    daysOfYear: [],
    xDays: 1,
    rrule: '',
    // Completion Criteria
    completionCriteria: 'yes_or_no',
    numericValue: 0,
    unitCategory: '',
    unit: '',
    customUnit: '',
    checklist: [{ task: '' }],
  });

  // Get the number of days in the current month
  const totalDays = 31;

  const addUTCOffset = date => {
    const istOffset = 5.5 * 60;
    return dayjs(date).add(istOffset, 'minute').toDate();
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleDateChange = (date, field) => {
    setFormData({
      ...formData,
      [field]: date,
    });
  };

  const handleFrequencyChange = event => {
    const { value } = event.target;
    setFormData({ ...formData, frequency: value });
  };

  const handleDayOfWeekChange = event => {
    const { value } = event.target;
    const newDaysOfWeek = formData.daysOfWeek.includes(value)
      ? formData.daysOfWeek.filter(day => day !== value)
      : [...formData.daysOfWeek, value];
    setFormData({
      ...formData,
      daysOfWeek: newDaysOfWeek,
    });
  };

  const handleDayOfMonthChange = event => {
    const day = parseInt(event.target.value, 10);
    const isChecked = event.target.checked;
    setFormData(prevFormData => {
      const updatedDaysOfMonth = isChecked
        ? [...prevFormData.daysOfMonth, day]
        : prevFormData.daysOfMonth.filter(d => d !== day);

      return { ...prevFormData, daysOfMonth: updatedDaysOfMonth };
    });
  };

  const handleDayOfYearBlur = e => {
    const input = e.target.value;
    const datesArray = input
      .split(',')
      .map(date => date.trim())
      .filter(date => dayjs(date, 'YYYY-MM-DD', true).isValid());

    setFormData({ ...formData, daysOfYear: datesArray });
  };

  const handleDayOfYearChange = event => {
    const { value } = event.target;
    // Split the input value by commas and trim whitespace
    const datesArray = value.split(',').map(date => date.trim());
    // Update the formData state
    setFormData({
      ...formData,
      daysOfYear: datesArray,
    });
  };

  // Function to generate rrule based on form data
  const generateRRule = () => {
    let rule;
    switch (formData.frequency) {
      case 'specific_days_of_week':
        rule = {
          freq: RRule.WEEKLY,
          byweekday: formData.daysOfWeek.map(day => RRule[day]),
        };
        break;

      case 'specific_days_of_month':
        rule = {
          freq: RRule.MONTHLY,
          bymonthday: formData.daysOfMonth,
        };
        break;

      case 'specific_days_of_year':
        rule = {
          freq: RRule.YEARLY,
          bymonthday: formData.daysOfYear.map(date => new Date(date).getDate()),
          bymonth: formData.daysOfYear.map(
            date => new Date(date).getMonth() + 1,
          ),
        };
        break;

      case 'every_x_days':
        rule = {
          freq: RRule.DAILY,
          interval: formData.xDays,
        };
        break;

      default:
        rule = {
          freq: RRule.DAILY,
          interval: 1,
        };
    }

    if (formData?.startDate) {
      rule.dtstart = addUTCOffset(formData?.startDate.startOf('day'));
    }
    if (formData?.endDate) {
      rule.until = addUTCOffset(formData?.endDate.endOf('day'));
    }

    const rrule = new RRule(rule)
      .toString()
      .replace(/\n/g, ';')
      .replace('RRULE:', '');

    setFormData({
      ...formData,
      rrule: rrule,
    });
    return rrule;
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const string = generateRRule();
    await createHabit({
      ...formData,
      rrule: string,
      startDate: dayjs(
        addUTCOffset(formData?.startDate?.startOf('day')),
      ).toDate(),
      endDate: dayjs(addUTCOffset(formData?.endDate?.endOf('day'))).toDate(),
    }).then(result => {
      console.log(result);
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={12} md={12}>
            <TextField
              fullWidth
              label="Habit Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <DatePicker
              label="Start Date"
              value={formData.startDate}
              onChange={date => handleDateChange(date, 'startDate')}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12} lg={6} md={6}>
            <DatePicker
              label="End Date"
              value={formData.endDate}
              onChange={date => handleDateChange(date, 'endDate')}
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isArchived}
                  onChange={handleChange}
                  name="isArchived"
                />
              }
              label="Archived"
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                <MenuItem value="health">Health</MenuItem>
                <MenuItem value="productivity">Productivity</MenuItem>
                <MenuItem value="learning">Learning</MenuItem>
                {/* Add other categories */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Priority"
              name="priority"
              type="number"
              value={formData.priority}
              onChange={handleChange}
            />
          </Grid>
          <Divider sx={{ marginBottom: 2 }} />
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Frequency</InputLabel>
              <Select
                name="frequency"
                value={formData.frequency}
                onChange={handleFrequencyChange}
              >
                <MenuItem value="everyday">Everyday</MenuItem>
                <MenuItem value="specific_days_of_week">
                  Specific Days of the Week
                </MenuItem>
                <MenuItem value="specific_days_of_month">
                  Specific Days of the Month
                </MenuItem>
                <MenuItem value="specific_days_of_year">
                  Specific Days of the Year
                </MenuItem>
                <MenuItem value="some_days_per_period">
                  Some Days per Period
                </MenuItem>
                <MenuItem value="every_x_days">Every X Days</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Specific Days of the Week */}
          {formData.frequency === 'specific_days_of_week' && (
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <FormGroup
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    gap: 1,
                  }}
                >
                  {['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'].map(day => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          value={day}
                          checked={formData.daysOfWeek.includes(day)}
                          onChange={handleDayOfWeekChange}
                        />
                      }
                      label={day}
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        ml: 2,
                      }}
                    />
                  ))}
                </FormGroup>
              </Grid>
            </Grid>
          )}

          {/* Specific Days of the Month */}
          {formData.frequency === 'specific_days_of_month' && (
            <Grid item xs={12}>
              <FormGroup sx={{ display: 'flex' }}>
                <Grid container item spacing={1}>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map(day => {
                    return day <= totalDays ? (
                      <Grid item xs={1} key={day}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value={day}
                              checked={formData.daysOfMonth.includes(day)}
                              onChange={handleDayOfMonthChange}
                            />
                          }
                          label={day}
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            mr: 2,
                          }}
                        />
                      </Grid>
                    ) : (
                      <Grid item xs={1} key={day} />
                    );
                  })}
                </Grid>
              </FormGroup>
            </Grid>
          )}

          {/* Specific Days of the Year */}
          {formData.frequency === 'specific_days_of_year' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Days of the Year"
                placeholder="Enter dates in YYYY-MM-DD format separated by commas"
                name="daysOfYear"
                value={formData.daysOfYear.join(', ')}
                onChange={e =>
                  handleDayOfYearChange({
                    target: { value: e.target.value.split(', ') },
                  })
                }
              />
            </Grid>
          )}

          {/* Every X Days */}
          {formData.frequency === 'every_x_days' && (
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Every X Days"
                type="number"
                name="xDays"
                value={formData.rawDaysOfYearInput || ''}
                onChange={e => {
                  setFormData({
                    ...formData,
                    rawDaysOfYearInput: e.target.value,
                  });
                }}
                onBlur={handleDayOfYearBlur}
              />
            </Grid>
          )}
          <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
          <Grid item xs={12}>
            <HabitCompletionForm
              setFormData={setFormData}
              formData={formData}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Create Habit
            </Button>
          </Grid>
        </Grid>
      </form>
    </LocalizationProvider>
  );
};

export default HabitForm;
