import moment from 'moment';

export const transformedSlots = (timeRangeArray) =>
  timeRangeArray.reduce((acc, timeRange) => {
    return acc.concat(transformTimeRangeToSlots(timeRange));
  }, []);

const transformTimeRangeToSlots = (timeRange) => {
  const slots = [];

  const startTime = moment(timeRange.start, 'HH:mm');
  const endTime = moment(timeRange.end, 'HH:mm');

  while (startTime.isBefore(endTime)) {
    if (endTime.diff(startTime, 'minutes') < 45) return slots;
    const slotEndTime = startTime.clone().add(45, 'minutes');
    slots.push({
      start: startTime?.format('HH:mm'),
      end: slotEndTime?.format('HH:mm'),
      booked: false,
    });
    startTime.add(45, 'minutes');
  }

  return slots;
};

export const slotsToTimeRanges = (slots) => {
  if (!slots || !Array.isArray(slots) || slots.length === 0) {
    return [{start: null, end: null}];
  }

  const timeRanges = [];
  let currentRange = null;

  for (const slot of slots) {
    const start = moment(slot.start, 'HH:mm');
    const end = moment(slot.end, 'HH:mm');

    if (!currentRange) {
      currentRange = {start, end};
    } else {
      // Check if the current slot is contiguous with the previous one
      if (currentRange.end.isSame(start)) {
        currentRange.end = end; // Extend the current range
      } else {
        // If not contiguous, push the current range and start a new one
        timeRanges.push({start: currentRange.start, end: currentRange.end});
        currentRange = {start, end};
      }
    }
  }

  // Push the last range if it exists
  if (currentRange) {
    timeRanges.push({start: currentRange.start, end: currentRange.end});
  }

  return timeRanges;
};
