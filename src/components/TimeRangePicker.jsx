/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import TimePicker from 'rc-time-picker';
import '../TimeRangePicker.css';
import {toast} from 'react-toastify';

const TimeRangePicker = ({idx, timeRanges, onRangeChange}) => {
  const [startTime, setStartTime] = useState(timeRanges[idx].start);
  const [endTime, setEndTime] = useState(timeRanges[idx].end);

  useEffect(() => {
    setStartTime(timeRanges[idx].start);
    setEndTime(timeRanges[idx].end);
  }, [timeRanges]);

  useEffect(() => {
    isTimeDifferenceValid();
  }, [startTime, endTime]);

  const checkValidStartTime = () => {
    if (idx >= 1 && startTime && timeRanges[idx - 1]?.end) {
      if (startTime.isBefore(timeRanges[idx - 1].end)) {
        toast.error('Start time cannot be less than previous end time');
        setStartTime();
      }
    }
  };

  useEffect(() => {
    checkValidStartTime();
  }, [startTime]);

  const handleStartTimeChange = (value) => {
    if (endTime) {
      setEndTime();
    }
    setStartTime(value);
    onRangeChange({start: value, end: endTime});
  };

  const handleEndTimeChange = (value) => {
    setEndTime(value);
    onRangeChange({start: startTime, end: value});
  };

  //can start from morning 8 only

  const disabledStartHours = () => {
    const disabledHours = Array.from({length: 8}, (_, i) => i);
    return disabledHours;
  };

  const disabledEndHours = () => {
    if (startTime) {
      const startHour = startTime.hour();
      const disabledHours = Array.from({length: startHour}, (_, i) => i);
      return disabledHours;
    } else {
      const disabledHours = Array.from({length: 8}, (_, i) => i);
      return disabledHours;
    }
  };

  const isTimeDifferenceValid = () => {
    const minTimeDifference = 45;
    if (startTime && endTime) {
      const timeDifference = endTime.diff(startTime, 'minutes');
      if (timeDifference < minTimeDifference) {
        toast.error('A session is minimum of 45 min');
        setEndTime();
      }
    }
  };

  return (
    <div className="flex gap-4">
      <div className="flex flex-col">
        <label className="text-[#00ACC1]">Start Time:</label>
        <TimePicker
          showSecond={false}
          minuteStep={15}
          value={startTime}
          hideDisabledOptions
          onChange={handleStartTimeChange}
          disabledHours={disabledStartHours}
          format="HH:mm"
        />
      </div>
      <div className="flex flex-col">
        <label className="text-[#00ACC1]">End Time:</label>
        <TimePicker
          showSecond={false}
          disabledHours={disabledEndHours}
          hideDisabledOptions
          minuteStep={15}
          value={endTime}
          onChange={handleEndTimeChange}
          format="HH:mm"
        />
      </div>
    </div>
  );
};

export default TimeRangePicker;
