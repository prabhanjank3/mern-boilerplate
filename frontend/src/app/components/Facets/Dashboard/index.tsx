import React, { useState, useEffect } from 'react';
import {
  Grid,
  Typography,
  List,
  Box,
  CircularProgress,
  Divider,
  Button,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Habit } from '../HabitForms/HabitDetails';
import dayjs, { Dayjs } from 'dayjs';
import HabitItem from '../Jouranl/JournalItem';
import HabitDetails from '../HabitDetails';
import { useFetchJournalQuery } from 'store/querySlice/journal.slice';
import ReusableModal from 'app/components/Universals/Modal';
import HabitForm from '../HabitForms/HabitDetails';

const DailyView = ({ setSelectedHabitId }) => {
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(
    dayjs(new Date()),
  );

  const [habits, setHabits] = useState([]);
  const { data, isFetching, isLoading } = useFetchJournalQuery(
    selectedDate?.toISOString().split('T')[0],
  );

  useEffect(() => {
    if (data) {
      setHabits(data);
    }
  }, [data]);

  return isLoading || isFetching ? (
    <CircularProgress sx={{ mt: '50%', ml: '50%', color: 'secondary.main' }} />
  ) : (
    <Grid container direction="column" spacing={2}>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', padding: 2 }}
      >
        <Grid item>
          <Typography sx={{ fontFamily: 'secondary.main', fontSize: '20px' }}>
            Today's Action Items
          </Typography>
        </Grid>
        <Grid item>
          <Box sx={{ display: 'flex' }}>
            <DatePicker
              label="Date"
              value={selectedDate}
              format="MMMM D, YYYY"
              onChange={date => setSelectedDate(date)}
              slotProps={{ textField: { size: 'small' } }}
              sx={{ mr: 2 }}
            />
            <ReusableModal
              TriggerComponent={<Button variant="contained">New Habit</Button>}
              ModalContent={<HabitForm />}
            />
          </Box>
        </Grid>
      </Box>
      <Divider />
      <Grid item sx={{ padding: 2 }}>
        <List>
          {habits.length > 0 ? (
            habits.map((habit: Habit) => (
              <Box
                onClick={() => {
                  setSelectedHabitId(habit.id as number);
                }}
                key={habit.id}
              >
                <HabitItem
                  habit={habit}
                  date={selectedDate?.toISOString().split('T')[0] as string}
                />
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

const Dashboard = () => {
  const [selectedHabitId, setSelectedHabitId] = useState<number | null>(null);

  return (
    <Grid container sx={{ padding: 0 }}>
      <Grid
        item
        lg={6}
        sx={{ borderRight: '1px dotted gray', height: '100vh' }}
      >
        <DailyView setSelectedHabitId={setSelectedHabitId} />
      </Grid>
      <Grid item lg={6}>
        <HabitDetails id={selectedHabitId} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
