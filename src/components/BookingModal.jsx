/* eslint-disable react/prop-types */
import {useState} from 'react';
const BookingModal = ({isOpen, onClose, doctorName, onBookAppointment}) => {
  const [remarks, setRemarks] = useState('');

  const handleInputChange = (event) => {
    setRemarks(event.target.value);
  };

  const handleSubmit = () => {
    setRemarks(remarks);
    onBookAppointment(remarks);
    onClose();
  };

  return (
    <dialog
      className={`fixed max-h-screen bg-transparent inset-0 overflow-hidden ${
        isOpen ? 'flex justify-center' : 'hidden'
      }`}>
      <div className="flex w-[100vw] items-center justify-center pt-4 px-4 pb-20 text-center">
        <div className="fixed inset-0 transition-opacity">
          <div className="absolute w-full inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">
          &#8203;
        </span>
        <div className="flex w-full flex-col align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">
                  Book Appointment with {doctorName}
                </h3>
                <div className="mt-2">
                  <textarea
                    value={remarks}
                    onChange={handleInputChange}
                    placeholder="Enter remarks here..."
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={handleSubmit}
              className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
              Book
            </button>
            <button
              onClick={() => {
                onClose();
                setRemarks('');
              }}
              className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default BookingModal;
