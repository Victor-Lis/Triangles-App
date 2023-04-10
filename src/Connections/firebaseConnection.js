import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyD3vj6qmd2SyhftUAnM6BxV-XcInQKlh_Y",
    authDomain: "triangle-app-dca16.firebaseapp.com",
    databaseURL: "https://triangle-app-dca16-default-rtdb.firebaseio.com",
    projectId: "triangle-app-dca16",
    storageBucket: "triangle-app-dca16.appspot.com",
    messagingSenderId: "490217478004",
    appId: "1:490217478004:web:2b532c96f592de10117e21",
    measurementId: "G-F2NYKLMKGX"
  };

if(!firebase.apps.length){
    const app = firebase.initializeApp(firebaseConfig);
}

export default firebase;