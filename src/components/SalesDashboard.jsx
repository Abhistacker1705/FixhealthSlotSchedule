/* eslint-disable no-unused-vars */
import WeekCalendar from './WeekCalendar';
import Navbar from './Navbar';
import TimeSlotGrid from './TimeSlotGrid';
import DoctorsTable from './DoctorsTable';
import {useState} from 'react';

const SalesDashboard = () => {
  const [dayNumber, setDayNumber] = useState();
  const [date, setDate] = useState();
  const [selectedTime, setSelectedTime] = useState();
  return (
    <div className="h-screen w-[100%]">
      <Navbar />
      <div className="flex flex-col w-full max-h-screen">
        <h2 className="text-2xl font-bold ml-8 mt-8">Sales Dashboard</h2>
        <div className="grid grid-cols-2 max-h-full max-lg:flex flex-col">
          <WeekCalendar onSelectDate={setDayNumber} setDate={setDate} />
          {dayNumber ? (
            <TimeSlotGrid
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              dayNumber={dayNumber}
            />
          ) : null}
        </div>

        {selectedTime ? (
          <DoctorsTable selectedTime={selectedTime} dayNumber={dayNumber} />
        ) : null}
      </div>
    </div>
  );
};

export default SalesDashboard;
