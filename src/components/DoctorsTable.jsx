/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import axios from 'axios';
import BookingModal from './BookingModal';

import {toast} from 'react-toastify';

const DoctorsTable = ({selectedTime, dayNumber}) => {
  const [doctorsinSlot, setDoctorsinSlot] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDoc, setModalDoc] = useState('');

  const handleOpenModal = (docName) => {
    setModalDoc(docName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getDrsinSelectedTime = async () => {
    const response = await axios.get(
      'https://api.jsonbin.io/v3/b/65beffa3266cfc3fde8573da'
    );

    const doctors = response.data.record.doctors;
    const matchingDoctors = doctors.filter((doctor) => {
      const dayNumberString = dayNumber.toString();
      const availabilityForDay = doctor.availability[dayNumberString];

      return availabilityForDay.some((slot) => slot.start === selectedTime);
    });
    setDoctorsinSlot(matchingDoctors);
  };

  useEffect(() => {
    getDrsinSelectedTime();
  }, [dayNumber, selectedTime]);

  //handle booking doctor locally
  const handleBookAppointment = () => {
    const updatedDoctors = doctorsinSlot.map((doctor) => {
      if (doctor.id === modalDoc.id) {
        const updatedAvailability = {...doctor.availability};
        updatedAvailability[dayNumber] = updatedAvailability[dayNumber].map(
          (slot) => {
            if (slot.start === selectedTime) {
              return {...slot, booked: true};
            }
            return slot;
          }
        );
        return {...doctor, availability: updatedAvailability};
      }
      return doctor;
    });
    setDoctorsinSlot(updatedDoctors);
    toast.success(`Booked slot at ${selectedTime} with Dr.${modalDoc}`);
    handleCloseModal();
  };

  return (
    <div className="w-[50%] p-8">
      <h2 className="text-2xl font-bold mb-4">Doctor Table</h2>
      <table className="w-[calc(100vw-4rem)] border rounded">
        <thead className="bg-gray-200">
          <tr>
            <th className="border-2 p-2">Name</th>
            <th className="border-2 p-2">Doctor Details</th>
            <th className="border-2 p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {doctorsinSlot.length > 0 ? (
            doctorsinSlot.map((doctor) => (
              <tr key={doctor.name}>
                <td className="border-2 p-2">{doctor.name}</td>
                <td className="border-2 p-2">
                  Specialist in Internal Medicine
                </td>
                <td className="border-2 p-2">
                  <button
                    onClick={() => handleOpenModal(doctor.name)}
                    className={`${
                      doctor?.availability[dayNumber]?.booked
                        ? `bg-red-500`
                        : `bg-green-500`
                    } text-white px-4 py-2 rounded`}>
                    {doctor?.availability[dayNumber]?.booked
                      ? 'Booked'
                      : 'Book'}
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
      <BookingModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        doctorName={modalDoc}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default DoctorsTable;
