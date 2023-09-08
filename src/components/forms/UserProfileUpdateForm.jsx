import { getAuth, updateProfile } from 'firebase/auth';
import { useFormik } from 'formik';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import { auth } from '../../firebase/firebase';

export default function UserProfileUpdateForm() {
  const [displayname, setDisplayname] = useState(auth.currentUser.displayName)
  const [photo, setPhoto] = useState(auth.currentUser.photoURL)

 
  const formik = useFormik({
    initialValues: {
      displayname: '',
      photo: '',
    },
    validationSchema: Yup.object({
      displayname: Yup.string().trim().min(2).max(30),
      photo: Yup.string().trim().min(5),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      updatePofileFB(values.displayname, values.photo);
      setDisplayname(values.displayname)
      setPhoto(values.photo)
    },
  });

  function updatePofileFB(displayname, photo) {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayname: displayname,
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

  return (
    <div>

    <h2>{displayname}</h2>
    <img className='profPic' src={photo} alt='' />
    <form onSubmit={formik.handleSubmit}>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.displayname}
        type='text'
        placeholder='displayname'
        id='displayname'
      />
      {formik.errors.displayname && formik.touched.displayname && (
        <p>{formik.errors.displayname}</p>
      )}
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.photo}
        type='text'
        placeholder='photo url'
        id='photo'
      />
      {formik.errors.displayname && formik.touched.displayname && (
        <p>{formik.errors.displayname}</p>
      )}
      <button className='' type='submit'>
        Update profile
      </button>
    </form>
    </div>
  );
}
