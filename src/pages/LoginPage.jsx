import React from 'react';
import Login from '../components/Login';
import GoogleLogin from '../components/GoogleLogin';

export default function LoginPage() {
  return (
    <div className=''>
      <Login />
      <GoogleLogin />
    </div>
  );
}
