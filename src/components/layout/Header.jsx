import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function Header() {
  const ctx = useAuth();

  function logOutFB() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        toast.success('You have logged out')
        // Sign-out successful.
        console.log('logged out')
      })
      .catch((error) => {
        // An error happened.
        console.log('error ===', error);
      });
  }

  return (
    <header className='container flex justify-between items-center p-2 '>
      <Link to={'/login'}>
        <img className='w-14' src="/img/64063 [Converted]-02.png" alt="logo" />
      </Link>
      <hr />
      <nav>
        {!ctx.isUserLoggedIn && (
          <NavLink
            to={'/login'}
            className={'text-lg px-3 py-2 hover:bg-slate-200'}
          >
            Login
          </NavLink>
        )}
        {!ctx.isUserLoggedIn && (
          <NavLink
            to={'/register'}
            className={'text-lg px-3 py-2 hover:bg-slate-200'}
          >
            Register
          </NavLink>
        )}
        {ctx.isUserLoggedIn && (
          <NavLink
            onClick={logOutFB}
            to={'/login'}
            className={'text-lg px-3 py-2 hover:bg-slate-200'}
          >
            LogOut
          </NavLink>
        )}
        {ctx.isUserLoggedIn && (
          <NavLink
            to={'/add-shop'}
            className={'text-lg px-3 py-2 hover:bg-slate-200'}
          >
            Add Shop
          </NavLink>
        )}
      </nav>
    </header>
  );
}
