const express = require("express");
const admin = require("firebase-admin");

const router = express.Router();

const tokens = [];

router.post("/register", (req, res) => {
  const { token } = req.body;

  tokens.push(token);
  res.status(200).json({ message: "Successfully registered FCM Token!" });
});

router.get("/listAll", (req, res) => {
  res.json(tokens);
});

router.post("/notification", async (req, res) => {
  try {
    const { title, body, imageUrl, token, androidData } = req.body;
    await admin.messaging().send({
      token: token,
      notification: {
        title: title,
        body: body,
        imageUrl: imageUrl,
      },
      android: {
        notification: {
          imageUrl: imageUrl,
        },
      },
      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },
      data: androidData,
    });

    res.status(200).json({ message: "Successfully sent notifications!" });
  } catch (err) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "Something went wrong!" });
  }
});

module.exports = router;
