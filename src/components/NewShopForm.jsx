import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../store/AuthProvider';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import  toast  from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function NewShopForm() {
  const ctx = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      shopname: '',
      description: '',
      town: '',
      year: '',
      image: '',
    },
    validationSchema: Yup.object({
      shopname: Yup.string().min(4).max(255).required(),
      description: Yup.string().min(6).required(),
      town: Yup.string().min(4).required(),
      year: Yup.number().min(1970).max(2025).required(),
      image: Yup.string().min(5).required(),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      const newShopWithUid = {
        ...values,
        userUid: ctx.userUid,
      };
      console.log('newShopWithUid ===', newShopWithUid);
      createNewShopFB(newShopWithUid);
    },
  });

  async function createNewShopFB(newShop) {
    try {
      const docRef = await addDoc(collection(db, 'shops'), newShop);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Shop created!');
      setTimeout(() => {
        navigate('/shops');
      }, 2000);
    } catch (error) {
      console.log('error ===', error);
      toast.error('Something went wrong');
    }
  }

  return (
    <form onSubmit={formik.handleSubmit} className='flex flex-col '>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.shopname}
        id='shopname'
        type='text'
        placeholder='Your shop name'
      />
      {formik.errors.shopname && formik.touched.shopname && (
        <p>{formik.errors.shopname}</p>
      )}
      <textarea
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        id='description'
        type='text'
        placeholder='Tell us about your shop'
      />
      {formik.errors.description && formik.touched.description && (
        <p>{formik.errors.description}</p>
      )}
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.town}
        id='town'
        type='text'
        placeholder='Shop location - town'
      />
      {formik.errors.town && formik.touched.town && <p>{formik.errors.town}</p>}
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.year}
        id='year'
        type='number'
        placeholder='Starting year'
      />
      {formik.errors.year && formik.touched.year && <p>{formik.errors.year}</p>}
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.image}
        id='image'
        type='text'
        placeholder='Image URL'
      />
      {formik.errors.image && formik.touched.image && (
        <p>{formik.errors.image}</p>
      )}
      <button type='submit'>Create Shop</button>
    </form>
  );
}
