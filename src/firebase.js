// firebase.js
// import Firebase from 'firebase'

import {firebaseApp} from './.env.local'

export const db = firebaseApp.firestore();