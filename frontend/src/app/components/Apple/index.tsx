/**
 *
 * Apple
 *
 */
import * as React from 'react';
import { useFetchHabitQuery } from 'store/querySlice/habit.slice';
import Dashboard from '../Facets/Dashboard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export function Apple() {
  const { data } = useFetchHabitQuery(1);
  React.useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Dashboard />
      </LocalizationProvider>
    </div>
  );
}
