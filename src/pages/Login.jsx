import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';

const Login = () => {
  return (
    <div className="max-h-screen">
      <Navbar />
      <div className="flex h-[calc(100vh-96px)]">
        <div className="lg:basis-9/12 h-full">
          <h1 className="text-3xl font-bold text-[#00ACC1] mt-8 ml-8 leading-normal">
            Your Health,Our Priority <br />
            <span className="text-2xl">
              Leading Physiotherapy Services Tailored for You
            </span>
          </h1>
          <LoginForm />
        </div>
        <img
          className="max-w-[50vw] aspect-square max-lg:hidden"
          src="/images/FixHealthLoginImage.jpg"
          alt="Fix Health is a platform to book physiotherapy"
        />
      </div>
    </div>
  );
};

export default Login;
