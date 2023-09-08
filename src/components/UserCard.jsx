import { useAuth } from '../store/AuthProvider';
import UserProfileUpdateForm from './forms/UserProfileUpdateForm';

export default function UserCard() {
  
  const ctx = useAuth();

  console.log()

  return (
    <div>
      <h2>{ctx.email}</h2>
      <UserProfileUpdateForm />
    </div>
  );
}
