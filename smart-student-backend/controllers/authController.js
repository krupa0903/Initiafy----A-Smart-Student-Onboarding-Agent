const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.loginOrSignup = async (req, res) => {
  try {
    const { email, password, role, name } = req.body;

    let user = await User.findOne({ email });

    // IF USER DOESN'T EXIST → SIGN UP
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name: name || email.split("@")[0],
        email,
        password: hashedPassword,
        role
      });
    } else {
      // USER EXISTS → VERIFY PASSWORD
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ success: false, error: "Incorrect password" });
      }
    }

    // GENERATE JWT
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "5d" }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};