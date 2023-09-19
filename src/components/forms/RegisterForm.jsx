import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { ref } from 'yup';
import MainBtn from '../UI/MainBtn';

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email()
        .matches(
          /^([a-ząčęėįšųūA-ZĄČĘĖĮŠŲŪ0-9._%-]+@[a-ząčęėįšųūA-ZĄČĘĖĮŠŲŪ0-9.-]+\.[a-zA-Z]{2,})$/,
          'Check if email is correct'
        )
        .required(),
      password: Yup.string().trim().min(6).max(255).required(),
      password2: Yup.string()
        .required('Please re-type your password')
        .oneOf([ref('password')], 'Passwords do not match'),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      createNewUserFB(values.email, values.password);
    },
  });

  function createNewUserFB(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Registration was successful');
        // Signed in
        const user = userCredential.user;
        console.log('new user ===', user);
        // ...
      })
      .catch((error) => {
        toast.error('Registration failed, check email or password');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn('error regitrating === ', errorCode, errorMessage);
        // ..
      });
  }

  return (
    <div className='w-[95%] bg-gray-100 mb-16 md:w-[540px] py-8 px-2'>
      <form
        onSubmit={formik.handleSubmit}
        className='max-w-sm flex flex-col gap-1 ml-auto mr-auto mt-6 w-full '
      >
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent  placeholder:text-gray-400'
          id='email'
          type='text'
          placeholder='Email'
        />
        {formik.errors.email && formik.touched.email && (
          <p className='text-red-600 font-medium ml-3'>{formik.errors.email}</p>
        )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mt-2 placeholder:text-gray-400'
          id='password'
          type='password'
          placeholder='Password'
        />
        {formik.errors.password && formik.touched.password && (
          <p className='text-red-600 font-medium ml-3'>
            {formik.errors.password}
          </p>
        )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mt-2 placeholder:text-gray-400'
          id='password2'
          type='password'
          placeholder='Repeat password'
        />
        {formik.errors.password2 && formik.touched.password2 && (
          <p className='text-red-600 font-medium ml-3'>
            {formik.errors.password2}
          </p>
        )}
        <MainBtn type={'submit'} text={'register'} mt />
      </form>
    </div>
  );
}
