
import UserCard from '../components/UserCard'

export default function UserProfilePage() {
  return (
    <div className='flex flex-col items-center mb-7 ml-auto mr-auto w-[370px] mt-[130px]'>
      <h1 className='py-1  mb-6 uppercase font-header text-3xl tracking-wider'>Your Profile</h1>
      <UserCard />
    </div>
  )
}
