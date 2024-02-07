/* eslint-disable no-unused-vars */
import {useUser} from '../contexts/UserContext';
import {useNavigate} from 'react-router-dom';
const Navbar = () => {
  const {user, updateUser} = useUser();
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 p-4 max-w-screen transition duration-500">
      <div className="flex px-4 items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://ik.imagekit.io/tcfp7i31d/logo_with_yp_white_6p2ZETYLi.svg"
            alt="Fix Health previously YourPhysio Rated 5 star across platforms"
            className="h-16 w-32"
          />
        </div>
        {window.location.pathname !== '/' ? (
          <div className="flex flex-row justify-center items-center gap-4 text-white">
            <span className="text-[#00ACC1]">{user.name}</span>

            <button
              onClick={() => navigate('/')}
              className={`bg-white text-[#00ACC1] text-sm px-2 py-2 rounded-md  active:bg-white active:text-[#00ACC1]  hover:bg-white hover:text-[#00ACC1]`}>
              Logout
            </button>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default Navbar;
