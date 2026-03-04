const express = require("express");
const router = express.Router();
const { loginOrSignup } = require("../controllers/authController");

router.post("/loginOrSignup", loginOrSignup);

module.exports = router;