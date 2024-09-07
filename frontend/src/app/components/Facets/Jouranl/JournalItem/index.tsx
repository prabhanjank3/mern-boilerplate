import React, { useState } from 'react';
import { Checkbox, Grid, Typography, IconButton, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import ReusableModal from 'app/components/Universals/Modal';
import ModalContent from '../ModalContent';
import { Habit } from '../../HabitForms/HabitDetails';
import {
  useAddEntryMutation,
  useEditEntryMutation,
} from 'store/querySlice/entry.slice';

type JournalItemProps = {
  habit: Habit;
  date: string;
};
// Define the types of data you'll be working with
type NumericValue = {
  value: number;
  unit?: string;
  customUnit?: string;
};

type Checklist = {
  task: string;
  completed: boolean;
};

type EntryData = {
  habitId: number;
  date: string; // ISO string format
  completionCriteria: 'yes_or_no' | 'numeric' | 'checklist';
  yesOrNo?: boolean;
  numericValue?: NumericValue;
  checklist?: Checklist[];
};
const HabitItem = ({ habit, date }: JournalItemProps) => {
  const [completionStatus, setCompletionStatus] = useState<string | null>(null); // null, 'completed', 'failed'

  const [addEntry] = useAddEntryMutation();
  const [updateEntry] = useEditEntryMutation();

  const handleToggleStatus = () => {
    if (completionStatus === 'completed') {
      setCompletionStatus('failed');
    } else if (completionStatus === 'failed') {
      setCompletionStatus(null);
    } else {
      setCompletionStatus('completed');
    }
  };

  const onSubmit = async (data: EntryData, id: number) => {
    data = { ...data, habitId: id, date };
    try {
      if ((habit?.entries?.length as number) > 0) {
        updateEntry({ id: (habit?.entries as unknown[])[0]?.['id'], data });
      } else {
        addEntry({ habitId: habit.id, data });
      }
    } catch (error) {
      console.error('Error logging entry:', error);
    }
  };
  return (
    <Grid
      container
      alignItems="center"
      spacing={2}
      sx={{ borderBottom: '1px solid #ddd', padding: 2, width: '100%' }}
    >
      <Grid item xs={8}>
        <Typography variant="h6">{habit.name}</Typography>
        <Box display="flex" alignItems="center">
          <AccessTimeIcon fontSize="small" />
          <Typography sx={{ marginLeft: 1 }}>Dummy Streak: 3 days</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <PriorityHighIcon fontSize="small" />
          <Typography sx={{ marginLeft: 1 }}>
            Priority: {habit.priority}
          </Typography>
        </Box>
      </Grid>

      {habit.completionCriteria === 'yes_or_no' && (
        <Grid item xs={2}>
          <IconButton onClick={handleToggleStatus}>
            {habit.completed && <CheckIcon color="success" />}
            {completionStatus === 'failed' && <CloseIcon color="error" />}
            {!completionStatus && <Checkbox />}
          </IconButton>
        </Grid>
      )}

      {habit.completionCriteria !== 'yes_or_no' && (
        <Grid item xs={2}>
          <ReusableModal
            TriggerComponent={<Checkbox checked={habit?.completed} />}
            ModalContent={
              <ModalContent
                completionCriteria={habit.completionCriteria}
                checklistData={
                  (habit.entries as unknown[])?.length > 0
                    ? (habit.entries as unknown[])[0]?.['checklist']
                    : habit.checklist.map(check => {
                        return { task: check.task, completed: false };
                      })
                }
                unit={habit.unit}
                customUnit={habit.customUnit}
                unitCategory={habit.unitCategory}
                entries={habit.entries}
                onSubmit={data => {
                  onSubmit(data, habit.id as number);
                }}
              />
            }
          />
        </Grid>
      )}
    </Grid>
  );
};

export default HabitItem;
