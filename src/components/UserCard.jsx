import { useAuth } from '../store/AuthProvider';
import UserProfileUpdateForm from './forms/UserProfileUpdateForm';

export default function UserCard() {
  
  const ctx = useAuth();

  console.log()

  return (
    <div className='flex flex-col items-center mb-7 ml-auto mr-auto w-[370px]'>
      <h3 className='bg-black px-2 py-1 text-white inline-block mb-2'>{ctx.email}</h3>
      <UserProfileUpdateForm />
    </div>
  );
}
