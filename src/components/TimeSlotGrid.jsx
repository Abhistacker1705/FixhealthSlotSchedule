import {useEffect, useState} from 'react';
import axios from 'axios';
/* eslint-disable react/prop-types */
const TimeSlotGrid = ({selectedTime, setSelectedTime, dayNumber}) => {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    axios.get('https://doctorslots.onrender.com/doctors').then((response) => {
      setDoctors(response.data);
    });
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const getTimeValues = () => {
    const doctorslotsaray = doctors?.map((doctor) =>
      doctor?.availability[dayNumber.toString()]?.map((slot) => slot?.start)
    );
    const timeValues = new Set([...doctorslotsaray.flat().sort()]);
    return timeValues;
  };

  const timeValues = new Array(...getTimeValues());

  const renderTimeButton = (time) => (
    <TimeButton
      key={time}
      time={time}
      setSelectedTime={setSelectedTime}
      selectedTime={selectedTime}
    />
  );

  return (
    <div className="bg-gray-900 m-8 p-8 rounded-lg">
      <h2 className="text-[#00ACC1] py-4 text-center">
        Select Available Time Slot
      </h2>
      {timeValues.length > 0 ? (
        <div className="mt-4 grid grid-cols-4 gap-4 overflow-y-auto max-h-[45vh]">
          {timeValues.map(renderTimeButton)}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[80%] ">
          <h2 className="text-center text-white">No slots available</h2>
        </div>
      )}
    </div>
  );
};

// eslint-disable-next-line react/prop-types
const TimeButton = ({time, setSelectedTime, selectedTime}) => (
  <button
    onClick={() => setSelectedTime(time)}
    className={`px-2 py-4 rounded-md  active:bg-white active:text-[#00ACC1]  hover:bg-white hover:text-[#00ACC1] ${
      selectedTime === time
        ? `bg-white text-[#00ACC1]`
        : `bg-[#00ACC1] text-white`
    }`}>
    {time}
  </button>
);

export default TimeSlotGrid;
