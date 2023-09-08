import { useState } from 'react';
import { useAuth } from '../store/AuthProvider';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function UserCard() {
  const [photoVal, setPhotoVal] = useState('');
  const [displayName, setDisplayName] = useState('');

  const ctx = useAuth();
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
    },
  });

  function updatePofileFB(){}

  return (
    <div>
      <h2>{ctx.email}</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          value={displayName}
          type='text'
          placeholder='displayname'
          id='displayname'
        />
        {}
        <input
          value={photoVal}
          onChange={formik.handleChange}
          type='text'
          placeholder='photo url'
          id='photo'
        />
        <button className='profBtn' type='submit'>
          Update profile
        </button>
      </form>
    </div>
  );
}
