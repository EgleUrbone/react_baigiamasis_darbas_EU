import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className='mt-[140px] flex flex-col justify-center items-center h-calc '>
      <div className='w-[95%] bg-gray-100 mb-16 md:w-[540px] py-10'>
        <h2 className='text-center text-xl font-semibold mb-6 w-[90%] ml-auto mr-auto'>
          Please log in to see the shops or register if you are new here
        </h2>
        <div className='flex gap-4 text-center w-[90%] ml-auto mr-auto'>
        <Link
          to={'/login'}
          className='mt-2 border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white'
        >
          Login
        </Link>
        <Link
          to={'/register'}
          className='mt-2 border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white'
        >
          Register
        </Link>
        </div>
      </div>
    </div>
  );
}
