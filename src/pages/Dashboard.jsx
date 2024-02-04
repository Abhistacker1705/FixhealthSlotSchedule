/* eslint-disable no-unused-vars */
import PatientDashboard from '../components/PatientDashboard';
import PhysioDashboard from '../components/PhysioDashboard';
import SalesDashboard from '../components/SalesDashboard';
import {useUser} from '../contexts/UserContext';
const Dashboard = () => {
  const {user, updateUser} = useUser();

  return (
    <>
      {user.role.toLowerCase() == 'physio' && <PhysioDashboard />}
      {user.role.toLowerCase() == 'sales' && <SalesDashboard />}
      {user.role.toLowerCase() == 'patient' && <PatientDashboard />}
    </>
  );
};

export default Dashboard;
