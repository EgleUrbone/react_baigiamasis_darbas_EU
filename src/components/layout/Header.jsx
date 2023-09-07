import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';

export default function Header() {
  const ctx = useAuth();

  function logOutFB() {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log('logged out')
      })
      .catch((error) => {
        // An error happened.
        console.log('error ===', error);
      });
  }

  return (
    <header className='container flex justify-between items-center'>
      <Link to={'/login'}>Logo</Link>
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
      <nav></nav>
    </header>
  );
}
