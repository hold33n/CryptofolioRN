import firebase from 'firebase'

const projectId = 'cryptofolio-app'

const config = {
  apiKey: "AIzaSyD_aEdkYm3qtr-rUm6KgfgvUKF-XB6a2Ws",
  authDomain: `${projectId}.firebaseapp.com`,
  databaseURL: `https://${projectId}.firebaseio.com`,
  projectId,
  storageBucket: `${projectId}.appspot.com`,
  messagingSenderId: "831003983801"
}

firebase.initializeApp(config)