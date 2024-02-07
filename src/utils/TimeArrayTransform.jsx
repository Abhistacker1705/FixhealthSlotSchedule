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
