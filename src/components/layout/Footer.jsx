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
      <div className='max-w-[1400px] ml-auto mr-auto'>
        <h2 className='text-2xl mb-6'>The Daily Chirp Newsletter</h2>
        <p className='mb-6'>
          Join 225,000 subscribers who start their day with Lorem ipsum dolor
          sit amet consectetur adipisicing elit. Nihil, odio!{' '}
          <FiFeather className='inline-block stroke-[1.5px]' />
        </p>
        <form
          onSubmit={formik.handleSubmit}
          className='sm:flex sm:items-center sm:justify-center sm:mb-10 sm:gap-3 lg:w-3/4 xl:w-3/6 xl:flex xl:items-center xl:justify-center xl:gap-3 xl:mb-10'
        >
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.newsemail}
            id='newsemail'
            type='text'
            placeholder='Email address'
            className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black sm:mb-0 xl:mb-0'
          />

          <button
            type='submit'
            className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-10 sm:mb-0 sm:w-40 xl:mb-0 xl:w-40 hover:bg-white hover:border-white'
          >
            JOIN
          </button>
        </form>
        {formik.errors.newsemail && formik.touched.newsemail && (
          <p className='text-red-600 font-medium ml-3 -mt-8 mb-8'>
            {formik.errors.newsemail}
          </p>
        )}
        <div className='lg:flex justify-between'>
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
            <Link
              to={'/register'}
              className='border-l-[1.5px] border-black px-2'
            >
              JOIN US
            </Link>
          </nav>
          <ul className='flex gap-2 text-xl mb-6 lg:text-2xl lg:gap-3'>
            <li>
              <Link to={'https://www.instagram.com/'}>
                <BiLogoInstagram />
              </Link>
            </li>
            <li>
              <Link to={'https://www.pinterest.com/'}>
                <BiLogoPinterest />
              </Link>
            </li>
            <li>
              <Link to={'https://twitter.com/'}>
                <BiLogoTwitter />
              </Link>
            </li>
            <li>
              <Link to={'https://lt-lt.facebook.com/'}>
                <BiLogoFacebook />
              </Link>
            </li>
          </ul>
        </div>
        <p className='flex gap-1 items-center'>
          <BiCopyright /> Chirp
        </p>
      </div>
    </footer>
  );
}
