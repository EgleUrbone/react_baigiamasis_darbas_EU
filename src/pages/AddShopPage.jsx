import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function AddShopPage() {
  const formik = useFormik({
    initialValues: {
      shopname: '',
      town: '',
      year: '',
      image: '',
    },
    validationSchema: Yup.object({
      shopname: Yup.string().min(4).max(255).required(),
      town: Yup.string().min(4).required(),
      year: Yup.number().min(1970).max(2025).required(),
      image: Yup.string().min(5).required(),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
    },
  });

  return (
    <div>
      <h1>AddsHOP</h1>
      <form onSubmit={formik.handleSubmit}>
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
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.town}
          id='town'
          type='text'
          placeholder='Shop location - town'
        />
        {formik.errors.town && formik.touched.town && (
          <p>{formik.errors.town}</p>
        )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.year}
          id='year'
          type='number'
          placeholder='Starting year'
        />
         {formik.errors.year && formik.touched.year && (
          <p>{formik.errors.year}</p>
        )}
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
    </div>
  );
}
