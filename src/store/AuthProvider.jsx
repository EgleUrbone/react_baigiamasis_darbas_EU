import { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext({
  email: '',
  isUserLoggedIn: false,
});

AuthContext.displayName = 'Auth';

export default function AuthProvider(props) {
  const [fireBaseUser, setFireBaseUser] = useState({});

  const email = fireBaseUser.email;
  const userUid = fireBaseUser.uid;
  const isUserLoggedIn = !!email;

  const ctx = {
    email: email,
    isUserLoggedIn: isUserLoggedIn,
    userUid: userUid,
  };
  // console.log('ctx ===', ctx);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log('login success');
        // ...
        setFireBaseUser(user);
      } else {
        // User is signed out
        // ...
        console.log('logOut');
        setFireBaseUser({});
      }
    });
  }, []);

  return (
    <AuthContext.Provider value={ctx}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
