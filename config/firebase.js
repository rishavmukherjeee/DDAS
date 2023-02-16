import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from "firebase/storage"
// add firebase config
const firebaseConfig = {
  apiKey: Constants.manifest.extra.apiKey,
  authDomain: Constants.manifest.extra.authDomain,
  projectId: Constants.manifest.extra.projectId,
  storageBucket: Constants.manifest.extra.storageBucket,
  messagingSenderId: Constants.manifest.extra.messagingSenderId,
  appId: Constants.manifest.extra.appId,
};/*
const firebaseConfig={
  apiKey: "AIzaSyBmbD2L2MRJ-qkXgKW0MyXMRJxsB0WKMIQ",
  authDomain: "drds-a2256.firebaseapp.com",
  databaseURL: "https://drds-a2256-default-rtdb.firebaseio.com",
  projectId: "drds-a2256",
  storageBucket: "drds-a2256.appspot.com",
  messagingSenderId: "328386991541",
  appId: "1:328386991541:web:bdae37f800a8841c9ff5fc",
  measurementId: "G-DSBK5Z90HN"
}
*/
// initialize firebase
const app = initializeApp(firebaseConfig);

// initialize auth
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(app)
export { auth };
