import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_apiKey,
  // authDomain: import.meta.env.VITE_authDomain,
  // projectId: import.meta.env.VITE_projectId,
  // storageBucket: import.meta.env.VITE_storageBucket,
  // messagingSenderId: import.meta.env.VITE_messagingSenderId,
  // appId: import.meta.env.VITE_appId,
  apiKey: 'AIzaSyB3C4wNPVfzL7EJQGh0wvwyjTbx9IfMQeE',
  authDomain: 'theskylibrary-ea40a.firebaseapp.com',
  projectId: 'theskylibrary-ea40a',
  storageBucket: 'theskylibrary-ea40a.appspot.com',
  messagingSenderId: '865683886515',
  appId: '1:865683886515:web:6d871f2a161afe37563bc6',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
