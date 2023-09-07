import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
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
      <h2>Login with google</h2>
      <button>
        <FcGoogle size={35} onClick={authWithGoogle} />
      </button>
    </>
  );
}
