import UserProfileUpdateForm from './forms/UserProfileUpdateForm';

export default function UserCard() {
  return (
    <div className='flex flex-col items-center mb-7 ml-auto mr-auto w-[370px]'>
      <UserProfileUpdateForm />
    </div>
  );
}
