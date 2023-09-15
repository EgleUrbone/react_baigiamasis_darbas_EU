import UserProfileUpdateForm from './forms/UserProfileUpdateForm';

export default function UserCard() {
  return (
    <div className='flex flex-col items-center ml-auto mr-auto w-[370px]'>
      <UserProfileUpdateForm />
    </div>
  );
}
