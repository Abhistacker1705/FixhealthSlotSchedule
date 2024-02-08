/* eslint-disable react/prop-types */
import {useEffect, useState} from 'react';
import axios from 'axios';
import BookingModal from './BookingModal';

import {toast} from 'react-toastify';

const DoctorsTable = ({selectedTime, dayNumber}) => {
  const [doctors, setDoctors] = useState([]);
  const [doctorsinSlot, setDoctorsinSlot] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalDoc, setModalDoc] = useState({});

  const handleOpenModal = (doc) => {
    setModalDoc(doc);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getDoctors = async () => {
    axios.get('https://doctorslots.onrender.com/doctors').then((response) => {
      setDoctors(response.data);
    });
  };

  const getDrsinSelectedTime = async () => {
    const matchingDoctors = doctors.filter((doctor) => {
      const dayNumberString = dayNumber.toString();
      const availabilityForDay = doctor.availability[dayNumberString];

      return availabilityForDay.some((slot) => slot.start === selectedTime);
    });
    setDoctorsinSlot(matchingDoctors);
  };

  // kept in seprate use effect otherwise will call api on every render
  useEffect(() => {
    getDoctors();
  }, []);

  useEffect(() => {
    getDrsinSelectedTime();
  }, [dayNumber, selectedTime, doctors]);

  // to see if a slot is booked/not
  const getbookedistrue = (doctor) => {
    const selectedTimeSlot = doctor?.availability[dayNumber.toString()].filter(
      (slot) => slot.start === selectedTime
    );
    return selectedTimeSlot[0]?.booked;
  };

  //availability update call
  const updateAvailability = (updatedAvailability) => {
    axios
      .put(
        `https://doctorslots.onrender.com/doctors/${modalDoc.id}/availability`,
        {
          availability: updatedAvailability,
        }
      )
      .then(() => {
        toast.success(
          `Booked slot at ${selectedTime} with Dr.${modalDoc.name}`
        );
        getDoctors();
      })
      .catch(() =>
        toast.error(
          `Error Booking slot at ${selectedTime} with Dr.${modalDoc.name}`
        )
      );
  };

  //handle booking doctor
  const handleBookAppointment = (remarks) => {
    const updatedDoctors = doctors.map((doctor) => {
      if (doctor.id === modalDoc.id) {
        const updatedAvailability = {...doctor.availability};
        updatedAvailability[dayNumber] = updatedAvailability[
          dayNumber.toString()
        ].map((slot) => {
          if (slot.start === selectedTime) {
            return {...slot, booked: true, remarks: remarks};
          }
          return slot;
        });
        updateAvailability(updatedAvailability);

        return {...doctor, availability: updatedAvailability};
      }
      return doctor;
    });
    setDoctors(updatedDoctors);

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
                    disabled={getbookedistrue(doctor)}
                    onClick={() => handleOpenModal(doctor)}
                    className={`${
                      getbookedistrue(doctor) ? `bg-red-500` : `bg-green-500`
                    } text-white px-4 py-2 rounded`}>
                    {getbookedistrue(doctor) ? 'Booked' : 'Book'}
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
        doctorName={modalDoc.name}
        onBookAppointment={handleBookAppointment}
      />
    </div>
  );
};

export default DoctorsTable;
