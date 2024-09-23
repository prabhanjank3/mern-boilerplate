import React from 'react';
import { Checkbox, Grid, Typography, Box } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ReusableModal from 'app/components/Universals/Modal';
import ModalContent from '../ModalContent';
import { Habit } from '../../HabitForms/HabitDetails';
import {
  useAddEntryMutation,
  useEditEntryMutation,
} from 'store/querySlice/entry.slice';
import { toast } from 'react-toastify';
import { Flag, LocalFireDepartment } from '@mui/icons-material';

type JournalItemProps = {
  habit: Habit;
  date: string;
};
// Define the types of data you'll be working with

const HabitItem = ({ habit, date }: JournalItemProps) => {
  // const [completionStatus] = useState<string | null>(null); // null, 'completed', 'failed'

  const [addEntry] = useAddEntryMutation();
  const [updateEntry] = useEditEntryMutation();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    data = { ...data, habitId: habit.id as number, date };
    try {
      if ((habit?.entries?.length as number) > 0) {
        updateEntry({
          id: (habit?.entries as unknown[])[0]?.['id'],
          data,
        }).then(resp => {
          console.log(resp);
          toast.success(`Updated Successfully`);
        });
      } else {
        addEntry({ habitId: habit.id, data }).then(resp => {
          console.log(resp);
          toast.success(`
          Added Successfully
        `);
        });
      }
    } catch (error) {
      toast.error('Error logging entry:');
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        borderBottom: '1px solid #ddd',
        paddingTop: 2,
        paddingBottom: 2,
        width: '100%',
      }}
    >
      <Grid item xs={8}>
        <Typography variant="body1" mb={1}>
          {habit.name}
        </Typography>
        <Box sx={{ display: 'flex' }}>
          <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
            <LocalFireDepartment
              fontSize="small"
              sx={{ color: 'secondary.main' }}
            />
            <Typography sx={{ marginLeft: 1 }} variant="body2">
              3
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
            <Flag fontSize="small" sx={{ color: 'secondary.main' }} />
            <Typography sx={{ marginLeft: 1 }} variant="body2">
              {habit.priority}
            </Typography>
          </Box>
        </Box>
      </Grid>

      {habit.completionCriteria === 'yes_or_no' && (
        <Grid item xs={2}>
          <Box
            onClick={() => {
              onSubmit({ yesOrNo: !habit.completed });
            }}
          >
            {habit?.completed && habit.completed === true && (
              <CheckIcon color="success" />
            )}
            {habit?.completed && !habit.completed && (
              <CloseIcon color="error" />
            )}
            {!habit?.completed && <Checkbox sx={{ padding: 1 }} />}
          </Box>
        </Grid>
      )}

      {habit.completionCriteria !== 'yes_or_no' && (
        <Grid item xs={2}>
          {
            <ReusableModal
              TriggerComponent={
                habit?.completed && habit.completed === true ? (
                  <CheckIcon color="success" />
                ) : habit?.completed && !habit.completed ? (
                  <CloseIcon color="error" />
                ) : (
                  <Checkbox checked={habit?.completed} />
                )
              }
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
                    onSubmit(data);
                  }}
                />
              }
            />
          }
        </Grid>
      )}
    </Box>
  );
};

export default HabitItem;
