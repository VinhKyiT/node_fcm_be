const express = require("express");
const admin = require("firebase-admin");
const pushNotifications = require("./notifications");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const serviceAccount = require("./firebase-admin-sdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.use("/", pushNotifications);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
