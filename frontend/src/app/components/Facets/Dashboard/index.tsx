import React, { useState, useEffect } from 'react';
import { Grid, Typography, List, ListItem, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import axios from 'axios';
import { Habit } from '../HabitForms/HabitDetails';
import dayjs, { Dayjs } from 'dayjs';
import HabitForm from '../HabitForms/HabitDetails';
import HabitItem from '../Jouranl/JournalItem';
import HabitDetails from '../HabitDetails';

const Sidebar = ({ setView }) => (
  <Grid
    item
    xs={3}
    lg={2}
    style={{ borderRight: '1px solid #ccc', padding: '16px' }}
  >
    <Typography variant="h6">Menu</Typography>
    <List>
      <ListItem button onClick={() => setView('dashboard')}>
        Dashboard
      </ListItem>
      <ListItem button onClick={() => setView('create')}>
        Create New Habit
      </ListItem>
    </List>
  </Grid>
);

const DailyView = ({ setSelectedHabitId }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date()),
  );

  const [habits, setHabits] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      axios
        .get(`http://localhost:3001/v1/journal/by-date?date=${formattedDate}`)
        .then(response => setHabits(response.data))
        .catch(error => console.error('Error fetching habits:', error));
    }
  }, [selectedDate]);

  return (
    <Grid container direction="column" spacing={2}>
      <Grid item>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={date => setSelectedDate(date)}
        />
      </Grid>
      <Grid item>
        <Typography variant="h6">
          Habits for {selectedDate ? selectedDate.toDate().toDateString() : ''}
        </Typography>
        <List>
          {habits.length > 0 ? (
            habits.map((habit: Habit) => (
              <Box
                onClick={() => {
                  setSelectedHabitId(habit.id as number);
                }}
                key={habit.id}
              >
                <HabitItem name={habit.name} />
              </Box>
            ))
          ) : (
            <Typography>No habits found for the selected date.</Typography>
          )}
        </List>
      </Grid>
    </Grid>
  );
};

const Layout = () => {
  const [view, setView] = useState('dashboard');
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);

  return (
    <Grid container>
      <Sidebar setView={setView} />

      <Grid item xs={9} lg={10} style={{ padding: '16px' }}>
        {view === 'dashboard' && (
          <Grid container>
            <Grid item lg={4}>
              <DailyView setSelectedHabitId={setSelectedHabitId} />
            </Grid>
            <Grid item lg={8}>
              <HabitDetails id={selectedHabitId} />
            </Grid>
          </Grid>
        )}
        {view === 'create' && <HabitForm />}
      </Grid>
    </Grid>
  );
};

export default Layout;
