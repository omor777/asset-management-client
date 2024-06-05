import {
  GithubAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
import useAxiosCommon from '../hooks/useAxiosCommon';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosCommon = useAxiosCommon();
  const createUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const logoutUser = () => {
    setLoading(true);
    return signOut(auth);
  };


  const updateUserProfile = (name, photoUrl) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      // console.log(currentUser);
      if (currentUser) {
        // get token and store client secret
        const userInfo = { email: currentUser.email };
        const { data } = await axiosCommon.post('/jwt', userInfo);
        // console.log(data);
        if (data.token) {
          localStorage.setItem('access-token', data.token);
        }
        setLoading(false);
      } else {
        //
        localStorage.removeItem('access-token')
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [axiosCommon]);

  const authInfo = {
    user,
    loading,
    setUser,
    createUser,
    loginUser,
    googleLogin,
    updateUserProfile,
    logoutUser,
    githubLogin,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
