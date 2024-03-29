import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../store/AuthProvider';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import MainBtn from '../UI/MainBtn';

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
    <form onSubmit={formik.handleSubmit} className='flex flex-col 2xl:grid 2xl:grid-cols-2 2xl:gap-6'>
      <div>
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.shopname}
        id='shopname'
        type='text'
        placeholder='Your shop name'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent  placeholder:text-gray-400'
      />
      {formik.errors.shopname && formik.touched.shopname && (
        <p className='text-red-600 font-medium ml-3'>
          {formik.errors.shopname}
        </p>
      )}

      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.town}
        id='town'
        type='text'
        placeholder='Shop location - town'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mt-2 placeholder:text-gray-400'
      />
      {formik.errors.town && formik.touched.town && (
        <p className='text-red-600 font-medium ml-3'>{formik.errors.town}</p>
      )}
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.year}
        id='year'
        type='number'
        placeholder='Starting year'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mt-2 placeholder:text-gray-400'
      />
      {formik.errors.year && formik.touched.year && (
        <p className='text-red-600 font-medium ml-3'>{formik.errors.year}</p>
      )}
      <input
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.image}
        id='image'
        type='text'
        placeholder='Image URL'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mt-2 placeholder:text-gray-400'
      />
      {formik.errors.image && formik.touched.image && (
        <p className='text-red-600 font-medium ml-3'>{formik.errors.image}</p>
      )}
      </div>
      <div className='2xl:h-full 2xl:grid'>
      <textarea
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.description}
        id='description'
        type='text'
        placeholder='Tell us about your shop'
        className='border border-black rounded-3xl py-2 px-3 block w-full bg-transparent mt-2 placeholder:text-gray-400 2xl:mt-0 2xl:justify-self-stretch'
      />
      {formik.errors.description && formik.touched.description && (
        <p className='text-red-600 font-medium ml-3'>
          {formik.errors.description}
        </p>
      )}
      </div>
      <div className='col-span-2 w-[50%] place-self-center'>
      <MainBtn type={'submit'} text={'create shop'} mt />
      </div>
    </form>
  );
}
