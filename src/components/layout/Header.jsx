import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../store/AuthProvider';
import { getAuth, signOut } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { auth } from '../../firebase/firebase';
import { CiMenuBurger } from 'react-icons/ci';

export default function Header() {
  const [shadow, setShadow] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

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
        navigate('/login');
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
          ? 'fixed top-0 w-full bg-white z-50 drop-shadow-2xl'
          : 'fixed top-0 w-full bg-white z-50'
      }
    >
      <div className='max-w-[1400px] ml-auto mr-auto'>
        <div className='flex justify-between items-center'>
          <Link to={'/login'}>
            <img
              className='w-20 m-4 cursor-pointer 2xl:w-24 xl:ml-0 xl:mr-auto ml:ml-auto'
              src='/img/logo-chirp-02.png'
              alt='logo'
            />
          </Link>
          <button onClick={() => setIsMobileOpen(!isMobileOpen)}>
            <CiMenuBurger className='lg:hidden block text-xl m-4' />
          </button>
        </div>
        {/* <div
          className={`lg:block ${
            isMobileOpen
              ? 'flex flex-col absolute top-9 bg-slate-200 right-0'
              : 'hidden'
          }`}
        > */}
        {/* <nav className='flex justify-center items-center lg:text-lg xl:gap-2'> */}
        <nav
          className={`${
            isMobileOpen
              ? 'flex flex-col absolute top-9 border rounded-lg bg-white right-0'
              : 'lg:flex lg:justify-center lg:items-center lg:text-lg xl:gap-2 hidden'
          }`}
        >
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
              to={'/add-shop'}
              className={
                'font-semibold mx-3 py-2 hover:border-b-2 hover:border-primary hover:text-primary'
              }
            >
              Add Shop
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
          {ctx.isUserLoggedIn ? (
            <img
              src={
                auth.currentUser?.photoURL
                  ? auth.currentUser.photoURL
                  : '/img/bird-user.png'
              }
              className={`${
                isMobileOpen
                  ? 'ml-3 mb-3 mt-2 w-7 h-7 object-cover cursor-pointer hover:border-[2px] hover:border-primary hover:rounded-full rounded-full inline-block'
                  : 'w-7 h-7 object-cover cursor-pointer hover:border-[2px] hover:border-primary hover:rounded-full rounded-full inline-block'
              }`}
              onClick={() => navigate('/user-profile')}
            />
          ) : (
            ''
          )}
          <div className='lg:hidden block'></div>
        </nav>
        {/* </div> */}
      </div>
      <hr className='-mt-[1px] w-[90%] ml-auto mr-auto' />
    </header>
  );
}
