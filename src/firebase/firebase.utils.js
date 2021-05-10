import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyD9sJmb9zMbmN7uvR29bh-5VShmUbu_mL8",
    authDomain: "crwn-clothing-3d9c8.firebaseapp.com",
    projectId: "crwn-clothing-3d9c8",
    storageBucket: "crwn-clothing-3d9c8.appspot.com",
    messagingSenderId: "464561181354",
    appId: "1:464561181354:web:5f7e90d6cbb625410536d3",
    measurementId: "G-F2CVPRE5W4"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
