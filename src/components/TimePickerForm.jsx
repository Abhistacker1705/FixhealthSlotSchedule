import {useState} from 'react';
import TimeRangePicker from './TimeRangePicker';
import moment from 'moment';
import {transformedSlots} from '../utils/timeArrayTransform';

// eslint-disable-next-line react/prop-types
const TimePickerForm = ({selectedDate, dayNumber}) => {
  const [timeRanges, setTimeRanges] = useState([{start: null, end: null}]);

  console.log(moment(selectedDate).format('DD-MM-YYYY'), dayNumber);

  const handleRangeChange = (index, {start, end}) => {
    const newTimeRanges = [...timeRanges];
    newTimeRanges[index] = {start, end};
    setTimeRanges(newTimeRanges);
  };

  const handleAddTimeRange = () => {
    const newTimeRanges = [...timeRanges, {start: null, end: null}];
    setTimeRanges(newTimeRanges);
  };

  const handleRemoveTimeRange = () => {
    setTimeRanges((prev) => prev.slice(0, -1));
  };

  const handleSubmit = async () => {
    // eslint-disable-next-line no-unused-vars
    const availableSlots = transformedSlots(timeRanges);
    //can be submitted to backend
  };

  return (
    <div className="bg-gray-900 m-8 p-8 rounded-lg max-h-full overflow-y-auto">
      <h2 className="text-[#00ACC1] py-4 text-center">
        Select Available Time Slots
      </h2>
      <div className="flex flex-col h-[45vh] gap-4 overflow-y-auto">
        {timeRanges.map((timeRange, index) => (
          <div key={index} className="flex items-end">
            <TimeRangePicker
              idx={index}
              timeRanges={timeRanges}
              onRangeChange={(value) => handleRangeChange(index, value)}
            />
            {index == timeRanges.length - 1 && index > 0 && (
              <button
                className="bg-[#00ACC1] rounded-md ml-4 font-bold px-4 text-3xl"
                onClick={handleRemoveTimeRange}>
                -
              </button>
            )}
            {index == timeRanges.length - 1 && (
              <button
                className="bg-[#00ACC1] rounded-md px-4 ml-4 mt-4 font-bold text-3xl"
                onClick={handleAddTimeRange}>
                +
              </button>
            )}
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-[#00ACC1] rounded-md px-4 w-24 mt-4">
          Submit
        </button>
      </div>
    </div>
  );
};

export default TimePickerForm;
