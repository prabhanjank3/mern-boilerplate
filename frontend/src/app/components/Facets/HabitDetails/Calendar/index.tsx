/**
 *
 * Calendar
 *
 */
import React, { SetStateAction, useState } from 'react';
import { Grid, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  setMonth,
  setYear,
} from 'date-fns';
import { styled } from '@mui/system';

interface DayBoxProps {
  status?: 'completed' | 'failed' | 'pending'; // Define possible status values
}

const DayBox = styled('div', {
  shouldForwardProp: prop => prop !== 'status', // Ensure status is not forwarded as an HTML attribute
})<DayBoxProps>(({ theme, status }) => {
  let backgroundColor, borderColor;

  switch (status) {
    case 'completed':
      backgroundColor = 'rgba(0, 128, 0, 0.2)'; // Transparent green
      borderColor = 'green'; // Darker green border
      break;
    case 'failed':
      backgroundColor = 'rgba(255, 0, 0, 0.2)'; // Transparent red
      borderColor = 'red'; // Darker red border
      break;
    case 'pending':
      backgroundColor = 'rgba(255, 255, 0, 0.2)'; // Transparent yellow
      borderColor = 'yellow'; // Darker yellow border
      break;
    default: // Transparent gray
      // Darker gray border
      backgroundColor = 'rgba(224, 224, 224, 0.2)';
      borderColor = '#bdbdbd';
      break;
  }

  return {
    padding: theme.spacing(2),
    margin: theme.spacing(1),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.shape.borderRadius,
    backgroundColor,
    border: `2px solid ${borderColor}`,
    color: borderColor,
  };
});

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const Calendar = ({ entries }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [monthAnchorEl, setMonthAnchorEl] = useState(null);
  const [yearAnchorEl, setYearAnchorEl] = useState<
    (EventTarget & HTMLSpanElement) | null
  >(null);

  // Handle month navigation
  const handlePrevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  // Handle month change
  const handleMonthChange = index => {
    const newDate = setMonth(currentDate, index);
    setCurrentDate(newDate);
    setMonthAnchorEl(null);
  };

  // Handle year change
  const handleYearChange = year => {
    const newDate = setYear(currentDate, year);
    setCurrentDate(newDate);
    setYearAnchorEl(null);
  };

  // Get the current month's start and end dates
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const dates = eachDayOfInterval({ start, end });

  // Pre-process entries to create a status map
  const statusMap = entries.reduce((acc, entry) => {
    const date = format(new Date(entry.date), 'yyyy-MM-dd');
    acc[date] = entry.status;
    return acc;
  }, {});

  // Generate a list of years (e.g., from 2000 to the current year + 10)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 50 }, (_, i) => currentYear - 25 + i);

  return (
    <div>
      <Grid container alignItems="center" justifyContent="space-between">
        <IconButton onClick={handlePrevMonth}>
          <ArrowBack />
        </IconButton>

        <Typography
          variant="h6"
          style={{ cursor: 'pointer' }}
          onClick={e =>
            setMonthAnchorEl(e.currentTarget as unknown as SetStateAction<null>)
          }
        >
          {months[currentDate.getMonth()]}
        </Typography>

        <Menu
          anchorEl={monthAnchorEl}
          open={Boolean(monthAnchorEl)}
          onClose={() => setMonthAnchorEl(null)}
        >
          {months.map((month, index) => (
            <MenuItem
              key={index}
              selected={index === currentDate.getMonth()}
              onClick={() => handleMonthChange(index)}
            >
              {month}
            </MenuItem>
          ))}
        </Menu>

        <Typography
          variant="h6"
          style={{ cursor: 'pointer' }}
          onClick={e => setYearAnchorEl(e.currentTarget)}
        >
          {currentDate.getFullYear()}
        </Typography>

        <Menu
          anchorEl={yearAnchorEl}
          open={Boolean(yearAnchorEl)}
          onClose={() => setYearAnchorEl(null)}
        >
          {years.map(year => (
            <MenuItem
              key={year}
              selected={year === currentDate.getFullYear()}
              onClick={() => handleYearChange(year)}
            >
              {year}
            </MenuItem>
          ))}
        </Menu>

        <IconButton onClick={handleNextMonth}>
          <ArrowForward />
        </IconButton>
      </Grid>

      <Grid container spacing={2}>
        {dates.map(date => {
          const formattedDate = format(date, 'yyyy-MM-dd');
          const status = statusMap[formattedDate] || 'default';

          return (
            <Grid item xs={1} key={formattedDate}>
              <DayBox status={status}>
                <Typography variant="body2">{format(date, 'd')}</Typography>
              </DayBox>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default Calendar;
