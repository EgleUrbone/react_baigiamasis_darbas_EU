import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { BiLogoGoogle } from 'react-icons/bi';
import { provider } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

export default function GoogleLogin() {
  const auth = getAuth();
  const navigate = useNavigate();

  function authWithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log('token ===', token);
        // The signed-in user info.
        const user = result.user;
        console.log('user ===', user);
        navigate('/shops');
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log('credential error ===', credential);
        // ...
      });
  }

  return (
    <>
      <button className='flex items-center justify-center gap-2 max-w-sm ml-auto mr-auto border border-black rounded-3xl py-2 px-3  w-full bg-transparent mb-6 uppercase hover:bg-primary hover:border-primary hover:text-white'>
      <BiLogoGoogle  size={30} onClick={authWithGoogle} /> Login with google 
      </button>
    </>
  );
}
