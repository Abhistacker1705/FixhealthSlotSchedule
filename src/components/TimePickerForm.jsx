/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react';
import TimeRangePicker from './TimeRangePicker';
import moment from 'moment';
import {transformedSlots} from '../utils/TimeArrayTransform';
import axios from 'axios';
import {toast} from 'react-toastify';

import {useUser} from '../contexts/UserContext';

// eslint-disable-next-line react/prop-types
const TimePickerForm = ({selectedDate, dayNumber}) => {
  const {user, updateUser} = useUser();
  const [availability, setAvailability] = useState({
    ['1']: [],
    ['2']: [],
    ['3']: [],
    ['4']: [],
    ['5']: [],
    ['6']: [],
  });

  const [timeRanges, setTimeRanges] = useState({
    ['1']: [{start: null, end: null, booked: false}],
    ['2']: [{start: null, end: null, booked: false}],
    ['3']: [{start: null, end: null, booked: false}],
    ['4']: [{start: null, end: null, booked: false}],
    ['5']: [{start: null, end: null, booked: false}],
    ['6']: [{start: null, end: null, booked: false}],
  });

  // useEffect(() => {
  //   addNewDoctor();
  // }, [availability]);

  const handleRangeChange = (index, {start, end}) => {
    setTimeRanges((prevTimeRanges) => {
      const newTimeRanges = {...prevTimeRanges};
      newTimeRanges[dayNumber.toString()][index] = {start, end};
      return newTimeRanges;
    });
  };

  const handleAddTimeRange = () => {
    setTimeRanges((prevTimeRanges) => {
      const newTimeRanges = {...prevTimeRanges};
      newTimeRanges[dayNumber.toString()].push({
        start: null,
        end: null,
        booked: false,
      });
      return newTimeRanges;
    });
  };

  const handleRemoveTimeRange = () => {
    setTimeRanges((prevTimeRanges) => {
      const newTimeRanges = {...prevTimeRanges};
      newTimeRanges[dayNumber.toString()].pop();
      return newTimeRanges;
    });
  };

  const handleSetAvailabilityforDay = () => {};

  const addNewDoctor = (newAvailability) => {
    const doc = {
      name: user.name,
      availability: newAvailability,
    };

    axios
      .post('https://doctorslots.onrender.com/doctors', doc)
      .then((res) => toast.success(res.data.message));
  };

  const handleSubmit = () => {
    const newAvailability = {
      ['1']: [],
      ['2']: [],
      ['3']: [],
      ['4']: [],
      ['5']: [],
      ['6']: [],
    };
    for (const day in timeRanges) {
      const availableSlots = transformedSlots(timeRanges[day]);
      newAvailability[day] = availableSlots;
    }
    addNewDoctor(newAvailability);
  };

  return (
    <div className="bg-gray-900 m-8 p-8 rounded-lg max-h-full overflow-y-auto">
      <h2 className="text-[#00ACC1] py-4 text-center">
        Select Available Time Slots
      </h2>
      <div className="flex flex-col h-[45vh] gap-4 overflow-y-auto">
        {timeRanges[dayNumber.toString()]?.map((timeRange, index) => (
          <div key={dayNumber.toString()[index]} className="flex items-end">
            <TimeRangePicker
              idx={index}
              timeRanges={timeRanges[dayNumber.toString()]}
              onRangeChange={(value) => handleRangeChange(index, value)}
            />
            {index == timeRanges[dayNumber].length - 1 && index > 0 && (
              <button
                className="bg-[#00ACC1] rounded-md ml-4 font-bold px-4 text-3xl"
                onClick={handleRemoveTimeRange}>
                -
              </button>
            )}
            {index == timeRanges[dayNumber].length - 1 && (
              <button
                className="bg-[#00ACC1] rounded-md px-4 ml-4 mt-4 font-bold text-3xl"
                onClick={handleAddTimeRange}>
                +
              </button>
            )}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleSubmit}
          className="bg-[#00ACC1] rounded-md px-4 w-24 mt-4">
          Submit
        </button>
        <p className="text-gray-400 opacity-75 ">
          Click submit after selecting time slots for a week
        </p>
      </div>
    </div>
  );
};

export default TimePickerForm;
