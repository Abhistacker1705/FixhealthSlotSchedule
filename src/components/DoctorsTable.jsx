/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import axios from 'axios';

const DoctorsTable = ({selectedTime, dayNumber}) => {
  const [doctorsinSlot, setDoctorsinSlot] = useState([]);
  const getDrsinSelectedTime = async () => {
    const response = await axios.get(
      'https://api.jsonbin.io/v3/b/65beffa3266cfc3fde8573da'
    );
    console.log(response);
    const doctors = response.data.record.doctors;
    const matchingDoctors = doctors.filter((doctor) => {
      console.log(doctor);
      const dayNumberString = dayNumber.toString();
      const availabilityForDay = doctor.availability[dayNumberString];
      console.log(availabilityForDay);
      return availabilityForDay.some((slot) => slot.start === selectedTime);
    });
    setDoctorsinSlot(matchingDoctors);
    console.log(matchingDoctors, selectedTime);
  };

  useEffect(() => {
    getDrsinSelectedTime();
  }, [dayNumber, selectedTime]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Doctor Table</h2>
      <table className="w-full border rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-2 p-2">Name</th>
            <th className="border-2 p-2">Remarks</th>
            <th className="border-2 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {doctorsinSlot.length > 0 ? (
            doctorsinSlot.map((doctor) => (
              <tr key={doctor}>
                <td className="border-2 p-2">{doctor.name}</td>
                <td className="border-2 p-2">
                  Specialist in Internal Medicine
                </td>
                <td className="border-2 p-2">
                  <button className="bg-green-500 text-white px-4 py-2 rounded">
                    Book
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-center text-2xl p-8 my-8">
                No doctors for this time slot
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsTable;
