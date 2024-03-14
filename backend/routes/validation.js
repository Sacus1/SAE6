const express = require("express");
const router = express.Router();
const connection = require("../database/database");
const { DateTime } = require("luxon");
router.route("/").post(async (req, res) => {
  const { token } = req.body;
  console.log(req.body);
  const getLastClientIdQuery = "SELECT MAX(id) AS lastId FROM `Client`";
  connection.execute(getLastClientIdQuery, async (err, rows) => {
    if (err) {
      return res.status(500).send(err);
    }
    const lastId = rows[0].lastId;
    const query = "INSERT INTO `Client` (id,token) VALUES (?)";
    connection.execute(query, [[lastId + 1, token]], async (err, result) => {
      if (err) {
        return res.status(500).send(err);
      }
      res.status(201).send("Client created successfully");
    });
  });
});

router.route("/").get(async (req, res) => {
  // get amount of clients
  const query = "SELECT COUNT(*) AS amount FROM `Client`";
  connection.execute(query, async (err, rows) => {
    if (err) {
      return res.status(500).send;
    }
    res.status(200).send("There is " + rows[0].amount + " client register");
  });
});

// router.route("/:adhesionId").delete(async (req, res) => {
//   const token =
//     req.headers.authorization && req.headers.authorization.split(" ")[1];

//   // Utilize the token to retrieve the client's ID
//   const queryUserId = "SELECT idClient FROM `Client` WHERE token = ?";
//   connection.execute(queryUserId, [token], async (err, userRows) => {
//     if (err) {
//       return res.status(500).send(err);
//     }

//     if (userRows.length === 0) {
//       return res.status(401).send("Invalid token");
//     }

//     const userId = userRows[0].idClient;

//     // Extract adhesion ID from the request parameters
//     const adhesionId = req.params.adhesionId;

//     // Query to delete the adhesion with the specified ID
//     const deleteQuery =
//       "DELETE FROM `Adhesion` WHERE idAdhesion = ? AND Client_idClient = ?";
//     connection.execute(
//       deleteQuery,
//       [adhesionId, userId],
//       async (err, result) => {
//         if (err) {
//           return res.status(500).send(err);
//         }

//         if (result.affectedRows === 0) {
//           // No adhesion with the specified ID found for the current user
//           return res.status(404).send("Adhesion not found");
//         }

//         // Adhesion deleted successfully
//         res.status(200).send("Adhesion deleted successfully");
//       }
//     );
//   });
// });

module.exports = router;
