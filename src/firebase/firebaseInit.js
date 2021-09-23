import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDg2NevneQPFr7-EU8qipwfqGo4Dc8tRx4',
  authDomain: 'blog-3d173.firebaseapp.com',
  projectId: 'blog-3d173',
  storageBucket: 'blog-3d173.appspot.com',
  messagingSenderId: '374975896584',
  appId: '1:374975896584:web:dccd92fe5668f3440985bd',
  measurementId: 'G-DYDXX0TGDP',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { timestamp };
export default firebaseApp.firestore();
