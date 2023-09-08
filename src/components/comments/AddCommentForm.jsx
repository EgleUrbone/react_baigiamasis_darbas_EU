import { addDoc, collection } from 'firebase/firestore';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { auth, db } from '../../firebase/firebase';
import toast from 'react-hot-toast';

export default function AddComment(props) {
  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: Yup.object({
      text: Yup.string().trim().min(5).required(),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      const newComment = {
        ...values,
        author: auth.currentUser.displayName,
      };
      console.log('newComment ===', newComment);
      createNewCommentFB(currentshopId, newComment);
    },
  });

  let currentshopId = props.shopId;
  console.log('currentshopId ===', currentshopId);


  async function createNewCommentFB(currentshopId, newComment) {
    try {
      const docRef = await addDoc(collection(db,'shops', currentshopId, 'comments'), newComment);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Comment created!');
    } catch (error) {
      console.log('error ===', error);
      toast.error('Something went wrong');
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className='w-full mt-12'>
      <textarea
        onChange={formik.handleChange}
        value={formik.values.text}
        id='text'
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
