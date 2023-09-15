import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import MainBtn from '../UI/MainBtn';

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
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
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      logInWithFB(values.email, values.password);
    },
  });

  function logInWithFB(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Login successful, hello!');
        // Signed in
        const user = userCredential.user;
        // console.log('user logged in ===', user);
        navigate('/shops');
        // ...
      })
      .catch((error) => {
        toast.error('Login failed, check email or password');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn('error loginantis  ===', errorCode, errorMessage);
      });
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='max-w-sm flex flex-col gap-1 ml-auto mr-auto mt-6 w-full'
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
        <p className='text-red-600 font-medium ml-3'>{formik.errors.password}</p>
      )}
      <MainBtn type={'submit'} text={'log in'} mt />
    </form>
  );
}
