import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { ref } from 'yup';

export default function RegisterForm() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      password2: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email().matches(
        /^([a-ząčęėįšųūA-ZĄČĘĖĮŠŲŪ0-9._%-]+@[a-ząčęėįšųūA-ZĄČĘĖĮŠŲŪ0-9.-]+\.[a-zA-Z]{2,})$/,
        'Check if email is correct'
      ).required(),
      password: Yup.string().trim().min(6).max(255).required(),
      password2: Yup.string()
        .required('Please re-type your password')
        .oneOf([ref('password')], 'Passwords do not match'),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      createNewUserFB(values.email, values.password)
    },
  });

  function createNewUserFB(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Registration was successful')
        // Signed in
        const user = userCredential.user;
        console.log('new user ===', user);
        // ...
      })
      .catch((error) => {
        toast.error('Registration failed, check email or password')
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn('error regitrating === ', errorCode, errorMessage )
        // ..
      });
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='max-w-sm flex flex-col gap-1 ml-auto mr-auto mt-6'
    >
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
          id='email'
          type='text'
          placeholder='Email'
        />
      {formik.errors.email && formik.touched.email && (
        <p>{formik.errors.email}</p>
      )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
          id='password'
          type='password'
          placeholder='Password'
        />
      {formik.errors.password && formik.touched.password && (
        <p>{formik.errors.password}</p>
      )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
          id='password2'
          type='password'
          placeholder='Repeat password'
        />
      {formik.errors.password2 && formik.touched.password2 && (
        <p>{formik.errors.password2}</p>
      )}
      <button
        type='submit'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-10 uppercase hover:bg-primary hover:border-primary hover:text-white'
      >
        Register
      </button>
    </form>
  );
}
