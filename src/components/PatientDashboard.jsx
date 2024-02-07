import Navbar from './Navbar';
import TimeSlotGrid from './TimeSlotGrid';
import WeekCalendar from './WeekCalendar';

const PatientDashboard = () => {
  return (
    <div className="h-screen max-w-screen">
      <Navbar />
      <div className="max-h-screen">
        <h2 className="text-2xl font-bold ml-8 mt-8">Patient Dashboard</h2>
        <div className="grid grid-cols-2 max-h-full max-lg:flex flex-col">
          <WeekCalendar />
          <TimeSlotGrid />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
