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
    console.log(depot);
    // check if the depot exists
    let query = "SELECT * FROM `depot` WHERE depot = ?";
    connection.query(query, [depot[0].depot], (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving depot");
        } else {
            if (result.length === 0) {
                // insert the depot
                query = "INSERT INTO `depot` (id,arrival) VALUES (?,?)";
                connection.query(query, [depot[0].depot, DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss")], (err, result) => {
                    if (err) {
                        res.status(500).send("Error inserting depot");
                    }
                });
            } else {
                // update the depot
                query = "UPDATE `depot` SET arrival = ? WHERE depot = ?";
                connection.query(query, [DateTime.now().toFormat("yyyy-MM-dd HH:mm:ss"), depot[0].depot], (err, result) => {
                    if (err) {
                        res.status(500).send("Error updating depot");
                    }
                });
            }
        }
    });
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
                        title: 'Arrivée au dépôt',
                        body: 'Une livraison est effectuée à' +depot[0].depot,
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

router.route("/").get(async (req, res) => {
    //TODO get all depots
    console.log("get all depots");
    connection.query("SELECT * FROM depot", (err, result) => {
        if (err) {
            res.status(500).send("Error retrieving depots");
        } else {
            res.status(200).send(result);
        }
    });
});
module.exports = router;
