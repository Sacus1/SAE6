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
    const  panier= req.body;
    console.log(panier);
    // send notification to the clients
    query = "SELECT token FROM `Client`";
    connection.query(query, (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving clients");
        } else {
            console.log(result);
            result.forEach((client) => {
                const message = {
                    notification: {
                        title: 'Un panier a été déposé',
                        body: 'Un '+panier[0].panier+' a été déposé',
                    },
                    token: client.token,
                };

                admin.messaging().send(message)
                    .then((response) => {
                        // Response is a message ID string
                        console.log('Successfully sent message:', response);
                    })
                    .catch((error) => {
                        console.log('Error sending message:', error);
                    });
            });
        }
    });
    res.status(200).send("Notification sent successfully");
});

module.exports = router;
