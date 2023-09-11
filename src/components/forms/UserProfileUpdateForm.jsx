import { getAuth, updateProfile } from 'firebase/auth';
import { useFormik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { auth } from '../../firebase/firebase';

export default function UserProfileUpdateForm() {
  const formik = useFormik({
    initialValues: {
      displayName: auth.currentUser.displayName ? auth.currentUser.displayName : '' ,
      photo: auth.currentUser.photoURL ? auth.currentUser.photoURL : '',
    },
    validationSchema: Yup.object({
      displayName: Yup.string().trim().min(2).max(30),
      photo: Yup.string().trim().min(5),
    }),
    onSubmit: (values) => {
      updatePofileFB(values.displayName, values.photo);
    },
  });

  function updatePofileFB(displayname, photo) {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: displayname,
      photoURL: photo,
    })
      .then(() => {
        // Profile updated!
        toast.success('Profile updated!');
        // ...
      })
      .catch((error) => {
        // An error occurred
        console.log('error ===', error);
        toast.error('Profile could not be updated');
        // ...
      });
  }
  console.log(auth.currentUser);

  return (
    <div className='flex flex-col items-center mb-7 ml-auto mr-auto w-[370px]'>
       <img
        className='rounded-full border-4 p-2 border-primary w-60 h-60 object-cover mb-7'
        src={auth.currentUser.photoURL ? formik.values.photo : '/img/bird-user.png'}
        alt=''
      /> 
      <h2 className='bg-black px-2 py-1 text-white text-lg inline-block mb-4'>
        {auth.currentUser.displayName ? formik.values.displayName : 'Display Name'}
      </h2>
      <h3 className='bg-black px-2 py-1 text-white inline-block mb-7'>
        {auth.currentUser.email}
      </h3>
      <form className='w-full' onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.displayName}
          type='text'
          placeholder='Displayname'
          id='displayName'
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
        />
        {formik.errors.displayName && formik.touched.displayName && (
          <p className='text-red-600 font-medium ml-3'>{formik.errors.displayName}</p>
        )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.photo}
          type='text'
          placeholder='Photo url'
          id='photo'
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
        />
        {formik.errors.photo && formik.touched.photo && (
          <p className='text-red-600 font-medium ml-3'>{formik.errors.photo}</p>
        )}
        <button
          className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white'
          type='submit'
        >
          Update profile
        </button>
      </form>
    </div>
  );
}
