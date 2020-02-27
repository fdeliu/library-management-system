  import firebase from 'firebase/app'
  import 'firebase/firestore'
  import 'firebase/storage'
  import 'firebase/auth'

  const config = {
    apiKey: process.env.REACT_APP_apiKey,
    authDomain: process.env.REACT_APP_authDomain,
    databaseURL: process.env.REACT_APP_databaseURL,
    projectId: process.env.REACT_APP_projectId,
    storageBucket: process.env.REACT_APP_storageBucket,
    messagingSenderId: process.env.REACT_APP_messagingSenderId,
    appId: process.env.REACT_APP_appId
  };
  
  // Initialize Firebase
  firebase.initializeApp(config);
  

  export default firebase;