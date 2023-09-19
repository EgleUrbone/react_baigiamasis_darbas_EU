import Login from '../components/forms/Login';
import GoogleLogin from '../components/GoogleLogin';

export default function LoginPage() {
  return (
    <div className='mt-[140px] flex flex-col justify-center items-center h-calc '>
      <div className='w-[95%] bg-gray-100 mb-16 md:w-[540px] py-8 px-2'>
        <Login />
        <p className='text-center font-semibold mb-3'>OR...</p>
        <GoogleLogin />
      </div>
    </div>
  );
}
