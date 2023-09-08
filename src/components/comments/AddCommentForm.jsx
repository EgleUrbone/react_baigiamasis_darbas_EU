import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddComment() {
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string().trim().min(5).required(),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
    }
  });

  

  return (
    <form onSubmit={formik.handleSubmit} className='w-full mt-12'>
      <textarea
        onChange={formik.handleChange}
        value={formik.values.comment}
        id='comment'
        type='text'
        className='border w-full p-2'
        rows='4'
        placeholder='Leave a comment'
      ></textarea>
      <button
        type='submit'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white'
      >
        Post
      </button>
    </form>
  );
}
