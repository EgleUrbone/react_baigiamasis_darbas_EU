import React from 'react'

export default function RegisterForm() {
  return (
    <form  className='max-w-sm flex flex-col gap-1'>
     <label>
        Email Address
        <input
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.email}
          className='border border-slate-500 px-4 py-2 w-full rounded-sm'
          id='email'
          type='text'
        />
      </label>
     <label>
        Password
        <input
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.email}
          className='border border-slate-500 px-4 py-2 w-full rounded-sm'
          id='password'
          type='text'
        />
      </label>
     <label>
        Repeat password
        <input
          // onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          // value={formik.values.email}
          className='border border-slate-500 px-4 py-2 w-full rounded-sm'
          id='password2'
          type='text'
        />
      </label>

    </form>
  )
}
