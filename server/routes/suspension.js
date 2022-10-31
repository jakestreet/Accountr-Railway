//server/suspension.js
module.exports = function(app) {
    const admin = require("firebase-admin");
    const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

    require("dotenv").config();

    const serviceAccount = JSON.parse(process.env.GOOGLE_CREDS);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });

    const db = getFirestore();
    
    //const cron = require('node-cron');

    
}