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
      email: Yup.string().email().required(),
      password: Yup.string().min(6).max(255).required(),
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
      {formik.errors.email && formik.touched.email && (
        <p>{formik.errors.email}</p>
      )}
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
      {formik.errors.password && formik.touched.password && (
        <p>{formik.errors.password}</p>
      )}
      <label>
        Repeat password
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password2}
          className='border border-slate-500 px-4 py-2 w-full rounded-sm'
          id='password2'
          type='password'
        />
      </label>
      {formik.errors.password2 && formik.touched.password2 && (
        <p>{formik.errors.password2}</p>
      )}
      <button
        type='submit'
        className='bg-slate-500 text-white px-4 py-2 rounded-sm'
      >
        Register
      </button>
    </form>
  );
}
