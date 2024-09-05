// src/components/HabitDetails.js
import React from 'react';
import { useFetchHabitQuery } from 'store/querySlice/habit.slice';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  List,
  ListItem,
} from '@mui/material';

const HabitDetails = ({ id }) => {
  const { data: habit, isLoading, isError } = useFetchHabitQuery(id);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error fetching habit details</Typography>;

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
        return <Typography>Every {habit.xDays} days</Typography>;
      default:
        return <Typography>Everyday</Typography>;
    }
  };

  const renderCompletionCriteria = () => {
    switch (habit.completionCriteria) {
      case 'yes_or_no':
        return <Typography>Yes or No</Typography>;
      case 'numeric_value':
        return (
          <div>
            <Typography>{`Numeric Value: ${habit.numericValue} ${habit.unit} `}</Typography>
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
        return <Typography>No completion criteria</Typography>;
    }
  };

  return (
    id && (
      <Container>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {habit.name}
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />

            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Typography variant="h6">Category</Typography>
                <Typography>{habit.category}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Typography variant="h6">Priority</Typography>
                <Typography>{habit.priority}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Typography variant="h6">Start Date</Typography>
                <Typography>
                  {new Date(habit.startDate).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3} lg={2}>
                <Typography variant="h6">End Date</Typography>
                <Typography>
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
                <Typography>{habit.description}</Typography>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6">Completion Criteria</Typography>
                {renderCompletionCriteria()}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    )
  );
};

export default HabitDetails;
