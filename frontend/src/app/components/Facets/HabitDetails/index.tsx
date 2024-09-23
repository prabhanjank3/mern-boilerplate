// src/components/HabitDetails.js
import React from 'react';
import { useFetchHabitQuery } from 'store/querySlice/habit.slice';
import {
  Typography,
  Grid,
  Divider,
  Chip,
  List,
  ListItem,
  CircularProgress,
  Box,
  Button,
} from '@mui/material';
import ReusableModal from 'app/components/Universals/Modal';
import HabitForm from '../HabitForms/HabitDetails';
import Calendar from './Calendar';

const entries = [
  { date: '2024-09-01', status: 'completed' },
  { date: '2024-09-02', status: 'failed' },
  { date: '2024-09-03', status: 'pending' },
  { date: '2024-09-04', status: 'completed' },
  { date: '2024-09-05', status: 'completed' },
  { date: '2024-09-06', status: 'failed' },
  { date: '2024-09-07', status: 'pending' },
  { date: '2024-09-08', status: 'completed' },
  { date: '2024-09-09', status: 'failed' },
  { date: '2024-09-10', status: 'pending' },
  { date: '2024-09-11', status: 'completed' },
  { date: '2024-09-12', status: 'completed' },
  { date: '2024-09-13', status: 'failed' },
  { date: '2024-09-14', status: 'pending' },
  { date: '2024-09-15', status: 'completed' },
];

const HabitDetails = ({ id }) => {
  const { data: habit, isLoading } = useFetchHabitQuery(id);

  if (isLoading)
    return (
      <CircularProgress
        sx={{ mt: '50%', ml: '50%', color: 'secondary.main' }}
      />
    );

  const renderFrequencyDetails = () => {
    switch (habit.frequency) {
      case 'specific_days_of_week':
        return (
          <List>
            {habit.daysOfWeek.map(day => (
              <ListItem key={day}>
                <Chip label={day} />
              </ListItem>
            ))}
          </List>
        );
      case 'specific_days_of_month':
        return (
          <List>
            {habit.daysOfMonth.map(day => (
              <ListItem key={day}>
                <Chip label={day} />
              </ListItem>
            ))}
          </List>
        );
      case 'specific_days_of_year':
        return (
          <List>
            {habit.daysOfYear.map(date => (
              <ListItem key={date}>
                <Chip label={new Date(date).toLocaleDateString()} />
              </ListItem>
            ))}
          </List>
        );
      case 'every_x_days':
        return (
          <Typography variant="body2">Every {habit.xDays} days</Typography>
        );
      default:
        return <Typography variant="body2">Everyday</Typography>;
    }
  };

  const renderCompletionCriteria = () => {
    switch (habit.completionCriteria) {
      case 'yes_or_no':
        return <Typography variant="body2">Yes or No</Typography>;
      case 'numeric_value':
        return (
          <div>
            <Typography variant="body2">{`Numeric Value: ${habit.numericValue} ${habit.unit} `}</Typography>
          </div>
        );
      case 'checklist':
        return (
          <List>
            {habit.checklist.map((task, index) => (
              <ListItem key={index}>
                <Chip label={task.task} />
              </ListItem>
            ))}
          </List>
        );
      default:
        return <Typography variant="body2">No completion criteria</Typography>;
    }
  };

  return (
    id && (
      <Box>
        <Box
          sx={{
            paddingLeft: 2,
            paddingBottom: 2.6,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography variant="h4" gutterBottom color={'secondary.main'}>
            {habit.name}
          </Typography>
          <ReusableModal
            TriggerComponent={<Button variant="contained">Edit</Button>}
            ModalContent={<HabitForm initialData={habit} />}
          />
        </Box>
        <Divider sx={{ marginBottom: 2 }} />

        <Grid container spacing={2} sx={{ padding: 2 }}>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Typography variant="h6">Category</Typography>
            <Typography variant="body2">{habit.category}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Typography variant="h6">Priority</Typography>
            <Typography variant="body2">{habit.priority}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Typography variant="h6">Start Date</Typography>
            <Typography variant="body2">
              {new Date(habit.startDate).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Typography variant="h6">End Date</Typography>
            <Typography variant="body2">
              {habit.endDate
                ? new Date(habit.endDate).toLocaleDateString()
                : 'No end date'}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3} lg={2}>
            <Typography variant="h6">Frequency</Typography>
            {renderFrequencyDetails()}
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Typography variant="h6">Description</Typography>
            <Typography variant="body2">{habit.description}</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6">Completion Criteria</Typography>
            {renderCompletionCriteria()}
          </Grid>
        </Grid>
        <Grid container>
          <Calendar entries={entries} />
          <Grid item lg={6}></Grid>
          <Grid item></Grid>
        </Grid>
      </Box>
    )
  );
};

export default HabitDetails;
