import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(255).required(),
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
        // Signed in
        const user = userCredential.user;
        console.log('user logged in ===', user);
        navigate('/shops')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn('error loginantis  ===', errorCode, errorMessage);
      });
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className='max-w-sm flex flex-col gap-1'
    >
      <label>
        Email Address
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className='border border-slate-500 px-4 py-2 w-full rounded-sm'
          id='email'
          type='text'
        />
      </label>
      {formik.errors.email && formik.touched.email && <p>{formik.errors.email}</p>}
      <label>
        Password
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className='border border-slate-500 px-4 py-2 w-full rounded-sm'
          id='password'
          type='password'
        />
      </label>
      {formik.errors.password && formik.touched.password && <p>{formik.errors.password}</p>}
      <button
        type='submit'
        className='bg-slate-500 text-white px-4 py-2 rounded-sm'
      >
        Log In
      </button>
    </form>
  );
}
