import {useState} from 'react';
import Navbar from './Navbar';
import TimePickerForm from './TimePickerForm';
import WeekCalendar from './WeekCalendar';

const PhysioDashboard = () => {
  const [dayNumber, setDayNumber] = useState();
  const [date, setDate] = useState();

  return (
    <div className="h-screen max-w-screen">
      <Navbar />
      <div className="max-h-screen">
        <h2 className="text-2xl font-bold ml-8 mt-8">Physio Dashboard</h2>
        <div className="grid grid-cols-2 max-h-full">
          <WeekCalendar onSelectDate={setDayNumber} setDate={setDate} />
          {dayNumber ? (
            <TimePickerForm selectedDate={date} dayNumber={dayNumber} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PhysioDashboard;
