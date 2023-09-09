import {
  BiLogoInstagram,
  BiLogoPinterest,
  BiLogoTwitter,
  BiLogoFacebook,
  BiCopyright,
} from 'react-icons/bi';
import { FiFeather } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='bg-primary py-12 px-6 mt-auto '>
      <h2 className='text-2xl mb-6'>The Daily Chirp Newsletter</h2>
      <p className='mb-6'>
        Join 225,000 subscribers who start their day with Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Nihil, odio!{' '}
        <FiFeather className='inline-block stroke-[1.5px]' />
      </p>
      <input
        type='text'
        placeholder='Email address'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
      />
      <button className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6'>
        JOIN
      </button>
      <nav className='mb-6'>
        <Link to={'/shops'} className='pr-2'>
          ABOUT
        </Link>
        <Link to={'/shops'} className='border-l-[1.5px] border-black px-2'>
          ADVERTISE
        </Link>
        <Link to={'/shops'} className='border-l-[1.5px] border-black px-2'>
          PRIVACY POLICY
        </Link>
        <Link to={'/shops'} className='border-l-[1.5px] border-black px-2'>
          TERMS
        </Link>
        <Link to={'/register'} className='border-l-[1.5px] border-black px-2'>
          JOIN US
        </Link>
      </nav>
      <ul className='flex gap-2 text-xl mb-6'>
        <li>
          <BiLogoInstagram />
        </li>
        <li>
          <BiLogoPinterest />
        </li>
        <li>
          <BiLogoTwitter />
        </li>
        <li>
          <BiLogoFacebook />
        </li>
      </ul>
      <p className='flex gap-1 items-center'>
        <BiCopyright /> Chirp
      </p>
    </footer>
  );
}
