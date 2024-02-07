import {useUser} from '../contexts/UserContext';
import {useNavigate} from 'react-router-dom';
const LoginForm = () => {
  const navigate = useNavigate();

  const {user, updateUser} = useUser();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    <div className="max-w-md mt-16 ml-8 bg-white rounded-lg">
      <div className="mb-4 border border-gray-300 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200">
        <label className="block pl-2 pt-2 text-xs text-gray-700">Name:</label>
        <input
          type="text"
          value={user.name}
          onChange={(e) => updateUser(e.target.value, user?.role)}
          placeholder="Enter your name"
          className="w-full px-3 py-2  rounded-md text-[#00ACC1] placeholder-gray-400 focus:outline-none"
        />
      </div>

      <div className="mb-4 border border-gray-300 focus-within:border-blue-500 focus-within:ring focus-within:ring-blue-200">
        <label className="block pl-2 pt-2 text-xs text-gray-700">
          Are you Patient / Physio / Sales ?
        </label>
        <select
          value={user.role}
          onChange={(e) => updateUser(user?.name, e.target.value)}
          className="w-full px-3 py-2  rounded-md text-[#00ACC1] placeholder-gray-400 focus:outline-none">
          <option value="physio">Physio</option>
          <option value="sales">Sales</option>
          <option value="patient">Patient</option>
        </select>
      </div>

      <button
        onClick={handleLogin}
        className="bg-[#00ACC1] text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
        Login
      </button>
    </div>
  );
};

export default LoginForm;
