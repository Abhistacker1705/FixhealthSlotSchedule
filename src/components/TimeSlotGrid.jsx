/* eslint-disable react/prop-types */
const TimeSlotGrid = ({selectedTime, setSelectedTime}) => {
  const generateTimeValues = () => {
    const startTime = new Date(2024, 0, 1, 8, 0);
    const endTime = new Date(2024, 0, 1, 24, 0);
    const timeGap = 15 * 60 * 1000;

    const timeValues = [];

    for (
      let time = startTime;
      time <= endTime;
      time.setTime(time.getTime() + timeGap)
    ) {
      const formattedTime = time.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      timeValues.push(formattedTime);
    }

    return timeValues;
  };

  const timeValues = new Array(...generateTimeValues());

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
      <div className="mt-4 grid grid-cols-4 gap-4 overflow-y-auto max-h-[45vh]">
        {timeValues.map(renderTimeButton)}
      </div>
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
