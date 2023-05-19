import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import { onAuthStateChanged } from 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyCENN6IwhcD2R37IMod-RxRMKGfPnS6TbU",
    authDomain: "capstone-d90a4.firebaseapp.com",
    projectId: "capstone-d90a4",
    storageBucket: "capstone-d90a4.appspot.com",
    messagingSenderId: "306065816243",
    appId: "1:306065816243:web:5fcc9a36ec72fda0c0cec6",
    measurementId: "G-39WEM8X21J"
  };
  
//const app=initializeApp(firebaseConfig)
export const app=initializeApp(firebaseConfig)
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage=getStorage(app)

