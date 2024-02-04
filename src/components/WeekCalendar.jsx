/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import Calendar from 'react-calendar';
import '../Calendar.css';
import moment from 'moment';

const WeekCalendar = ({onSelectDate, setDate}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().getDay());
  const [nextWeekStartDate, setNextWeekStartDate] = useState(new Date());
  const [nextWeekEndDate, setNextWeekEndDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(moment(date).day());
    setDate(date);
    onSelectDate(moment(date).day());
  };
  //find next week from mon to sat
  const calculateNextWeek = () => {
    const startDate = new Date(nextWeekStartDate);
    if (startDate.getDay() == 0) {
      startDate.setDate(startDate.getDate() + 1);
    } else {
      while (startDate.getDay() !== 1) {
        startDate.setDate(startDate.getDate() - 1);
      }
    }
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 5);
    setNextWeekStartDate(startDate);
    setNextWeekEndDate(endDate);
  };

  useEffect(() => {
    calculateNextWeek();
  }, []);

  return (
    <div className="bg-gray-900 m-8 p-8 rounded-lg">
      <h2 className="text-[#00ACC1] py-4 text-center">
        Select Available Slots for Next Week
      </h2>
      <Calendar
        minDate={nextWeekStartDate}
        maxDate={nextWeekEndDate}
        maxDetail="month"
        onChange={handleDateChange}
        value={selectedDate}
        tileClassName={({date}) =>
          moment(date).day() == selectedDate ? 'activeDate' : ''
        }
      />
    </div>
  );
};

export default WeekCalendar;
