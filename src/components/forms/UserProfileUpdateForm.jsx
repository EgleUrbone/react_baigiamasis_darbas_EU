import { getAuth, updateProfile } from 'firebase/auth';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { auth } from '../../firebase/firebase';

export default function UserProfileUpdateForm() {
  const [displayName, setDisplayName] = useState(auth.currentUser.displayName)
  const [photo, setPhoto] = useState(auth.currentUser.photoURL)

 
  const formik = useFormik({
    initialValues: {
      displayName: '',
      photo: '',
    },
    validationSchema: Yup.object({
      displayName: Yup.string().trim().min(2).max(30),
      photo: Yup.string().trim().min(5),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      updatePofileFB(values.displayName, values.photo);
      setDisplayName(values.displayName)
      setPhoto(values.photo)
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
console.log(auth.currentUser)

  return (
    <div className='flex flex-col items-center mb-7 ml-auto mr-auto w-[370px]'>
    <h2 className='bg-black px-2 py-1 text-white text-lg inline-block mb-4'>{displayName}</h2>
    <img className='rounded-full border-4 p-2 border-primary w-60 h-60 object-contain mb-7' src={photo} alt='' />
    <form className='w-full' onSubmit={formik.handleSubmit}>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.displayName}
        type='text'
        placeholder='displayname'
        id='displayName'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
      />
      {formik.errors.displayName && formik.touched.displayName && (
        <p>{formik.errors.displayName}</p>
      )}
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.photo}
        type='text'
        placeholder='photo url'
        id='photo'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-2 placeholder:text-black'
      />
      {formik.errors.photo && formik.touched.photo && (
        <p>{formik.errors.photo}</p>
      )}
      <button  className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white' type='submit'>
        Update profile
      </button>
    </form>
    </div>
  );
}
