import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useState } from 'react';

export default function Header() {
  const [shadow, setShadow] = useState(false);

  const navigate = useNavigate();

  const addShadow = () => {
    if (window.scrollY >= 110) {
      setShadow(true);
    } else {
      setShadow(false);
    }
  };

  window.addEventListener('scroll', addShadow);

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
    <header
      className={
        shadow
          ? 'fixed top-0 w-full bg-white z-50 drop-shadow-2xl '
          : 'fixed top-0 w-full bg-white z-50'
      }
    >
      <div className='max-w-[1400px] ml-auto mr-auto'>
        <Link to={'/login'}>
          <img
            className='w-20 m-4 cursor-pointer 2xl:w-24 xl:ml-0 xl:mr-auto ml:ml-auto'
            src='/img/logo-chirp-02.png'
            alt='logo'
          />
        </Link>

        <nav className='flex justify-center items-center lg:text-lg xl:gap-2'>
          {!ctx.isUserLoggedIn && (
            <NavLink
              to={'/login'}
              className={
                'font-semibold mx-3 py-2 hover:border-b-2 hover:border-primary hover:text-primary'
              }
            >
              Log In
            </NavLink>
          )}
          {!ctx.isUserLoggedIn && (
            <NavLink
              to={'/register'}
              className={
                'font-semibold mx-3 py-2 hover:border-b-2 hover:border-primary hover:text-primary'
              }
            >
              Register
            </NavLink>
          )}
          {ctx.isUserLoggedIn && (
            <NavLink
              to={'/shops'}
              className={
                'font-semibold mx-3 py-2 hover:border-b-2 hover:border-primary hover:text-primary'
              }
            >
              Shops
            </NavLink>
          )}
          {ctx.isUserLoggedIn && (
            <NavLink
              onClick={logOutFB}
              to={'/login'}
              className={
                'font-semibold mx-3 py-2 hover:border-b-2 hover:border-primary hover:text-primary'
              }
            >
              Log Out
            </NavLink>
          )}
          {ctx.isUserLoggedIn && (
            <NavLink
              to={'/add-shop'}
              className={
                'font-semibold mx-3 py-2 hover:border-b-2 hover:border-primary hover:text-primary'
              }
            >
              Add Shop
            </NavLink>
          )}
          {ctx.isUserLoggedIn ? (
            <img
              src='/img/bird-user.png'
              className='w-7 cursor-pointer hover:border-[2px] hover:border-primary hover:rounded-full'
              onClick={() => navigate('/user-profile')}
            />
          ) : (
            ''
          )}
        </nav>
      </div>
      <hr className='-mt-[1px] w-[90%] ml-auto mr-auto' />
    </header>
  );
}
