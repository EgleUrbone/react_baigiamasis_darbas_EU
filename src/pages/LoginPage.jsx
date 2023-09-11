import Login from '../components/forms/Login';
import GoogleLogin from '../components/GoogleLogin';

export default function LoginPage() {
  return (
    <div className='mt-[140px]'>
      <Login />
      <p className='text-center font-semibold mb-3'>OR...</p>
      <GoogleLogin />
    </div>
  );
}
