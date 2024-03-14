const express = require("express");
const router = express.Router();
const connection = require("../database/database");
const { DateTime } = require("luxon");
const admin = require('firebase-admin');
const serviceAccount = require('../sae6-416315-firebase-adminsdk-ipved-04b46fb7cb.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
router.route("/").post(async (req, res) => {
    const  depot= req.body;
    //TODO set depot timestamp to the database

    // send notification to the client
    const message = {
        notification: {
            title: 'Un panier a été déposé',
            body: 'Un panier a été déposé au point de dépôt ' + depot.depot,
        },
        token: 'BPMkEIhlITBB46RkNhm4EV47aYOwDQxDdlFz7JjcUOdbowyw-Lkxjxp-ewLYTSuX0OFQUm2Ql-5rkbSuwb5YXTg',
    };

    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });

    res.status(200).send("Notification sent successfully");
});

module.exports = router;
