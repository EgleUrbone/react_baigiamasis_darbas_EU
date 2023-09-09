import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  BiLogoInstagram,
  BiLogoPinterest,
  BiLogoTwitter,
  BiLogoFacebook,
  BiCopyright,
} from 'react-icons/bi';
import { FiFeather } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Footer() {
  const formik = useFormik({
    initialValues: {
      newsemail: '',
    },
    validationSchema: Yup.object({
      newsemail: Yup.string()
        .trim()
        .email()
        .matches(
          /^([a-ząčęėįšųūA-ZĄČĘĖĮŠŲŪ0-9._%-]+@[a-ząčęėįšųūA-ZĄČĘĖĮŠŲŪ0-9.-]+\.[a-zA-Z]{2,})$/,
          'Check if email is correct'
        )
        .required(),
    }),
    onSubmit: (values) => {
      console.log('email for newsletter received ===', values);
      toast.success('You subscribed to our newsletter!');
    },
  });

  return (
    <footer className='bg-primary py-12 px-6 mt-auto '>
      <h2 className='text-2xl mb-6'>The Daily Chirp Newsletter</h2>
      <p className='mb-6'>
        Join 225,000 subscribers who start their day with Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Nihil, odio!{' '}
        <FiFeather className='inline-block stroke-[1.5px]' />
      </p>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newsemail}
          id='newsemail'
          type='text'
          placeholder='Email address'
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
        />
        {formik.errors.newsemail && formik.touched.newsemail && (
          <p className='text-red-600 font-medium ml-3'>
            {formik.errors.newsemail}
          </p>
        )}
        <button
          type='submit'
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6'
        >
          JOIN
        </button>
      </form>
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
