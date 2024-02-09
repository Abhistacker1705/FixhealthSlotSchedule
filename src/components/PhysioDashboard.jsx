/* eslint-disable no-unused-vars */
import {useEffect, useState} from 'react';
import Navbar from './Navbar';
import TimePickerForm from './TimePickerForm';
import WeekCalendar from './WeekCalendar';
import axios from 'axios';
import {useUser} from '../contexts/UserContext';
import moment from 'moment';

const PhysioDashboard = () => {
  const {user, updateUser} = useUser();
  const [dayNumber, setDayNumber] = useState(moment().day());
  const [date, setDate] = useState();
  const [availability, setAvailability] = useState({
    ['1']: [],
    ['2']: [],
    ['3']: [],
    ['4']: [],
    ['5']: [],
    ['6']: [],
  });

  useEffect(() => {
    axios
      .get(`https://doctorslots.onrender.com/doctors/${user.name}/availability`)
      .then((res) => {
        setAvailability(res.data.availability);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);

  return (
    <div className="h-screen max-w-screen">
      <Navbar />
      <div className="max-h-screen">
        <h2 className="text-2xl font-bold ml-8 mt-8">Physio Dashboard</h2>
        <div className="grid grid-cols-2 max-lg:flex flex-col max-h-full">
          <WeekCalendar onSelectDate={setDayNumber} setDate={setDate} />
          {dayNumber ? (
            <TimePickerForm
              selectedDate={date}
              dayNumber={dayNumber}
              availability={availability}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PhysioDashboard;
