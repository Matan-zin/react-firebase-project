import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

import * as FIREBASE from '../constants/.env.variables.js'
import { seedDatabase } from '../seed.js'

const config = {
    apiKey:          FIREBASE.API_KEY,
    authDomain:      FIREBASE.AUTH_DOMAIN,
    projectId:       FIREBASE.PROJECT_ID,
    storageBucket:   FIREBASE.STORAGE_BUCKET,
    messageSenderId: FIREBASE.MESSAGING_SENDER_ID,
    appId:           FIREBASE.APP_ID,
}

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// calling to seedDatabase() if firebase dosen't initialized before
(async () => {
    let res = undefined;

    firebase
        .firestore()
        .collection('safe-guard')
        .get()
        .then(resp => [ res ] = resp.docs.map(item => item.data()))
        .then(() => { if( res?.id !== 1 ) seedDatabase(firebase)})
        .catch(err => console.error(err));
})();

export { firebase, FieldValue };