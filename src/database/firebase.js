
import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyAVu8hIbG4Z8U641F7BMK-7fECk4qSNp_A",
    authDomain: "thestartupfest-43364.firebaseapp.com",
    databaseURL: "https://thestartupfest-43364.firebaseio.com",
    projectId: "thestartupfest-43364",
    storageBucket: "thestartupfest-43364.appspot.com",
    messagingSenderId: "726675505779"
}
const firebaseApp = firebase.initializeApp(config)

export default firebaseApp
