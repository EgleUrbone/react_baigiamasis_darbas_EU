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
        toast.success('You have logged out');
        // Sign-out successful.
        console.log('logged out');
      })
      .catch((error) => {
        // An error happened.
        console.log('error ===', error);
      });
  }

  return (
    <header >
        <Link to={'/login'}>
          <img
            className='w-14 m-2'
            src='/img/64063 [Converted]-02.png'
            alt='logo'
          />
        </Link>
       
        <nav className='flex justify-center items-center'>
          {!ctx.isUserLoggedIn && (
            <NavLink
              to={'/login'}
              className={'font-semibold mx-3 py-2 hover:border-b-2 hover:border-orange-700 hover:text-orange-700'}
            >
              Log In
            </NavLink>
          )}
          {!ctx.isUserLoggedIn && (
            <NavLink
              to={'/register'}
              className={'font-semibold mx-3 py-2 hover:border-b-2 hover:border-orange-700 hover:text-orange-700'}
            >
              Register
            </NavLink>
          )}
          {ctx.isUserLoggedIn && (
            <NavLink
              onClick={logOutFB}
              to={'/shops'}
              className={'font-semibold mx-3 py-2 hover:border-b-2 hover:border-orange-700 hover:text-orange-700'}
            >
              Shops
            </NavLink>
          )}
          {ctx.isUserLoggedIn && (
            <NavLink
              onClick={logOutFB}
              to={'/login'}
              className={'font-semibold mx-3 py-2 hover:border-b-2 hover:border-orange-700 hover:text-orange-700'}
            >
              Log Out
            </NavLink>
          )}
          {ctx.isUserLoggedIn && (
            <NavLink
              to={'/add-shop'}
              className={'font-semibold border-b-2 border-white mx-3 py-2 hover:border-b-2 hover:border-orange-700 hover:text-orange-700'}
            >
              Add Shop
            </NavLink>
          )}
        </nav>
      <hr className='w-[90%] ml-auto mr-auto mb-5' />
   
    </header>
  );
}
