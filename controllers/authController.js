const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserDao = require("../dao/user")

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await UserDao.findUserByEmail({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await UserDao.createUser({
      name,
      email,
      hashedPassword,
    });

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!req.userId || !name) {
      return res.status(400).json({
        success: false,
        message: "userId and name are required",
      });
    }

    const updatedUser = await UserDao.updateUserById({
      userId: req.userId,
      name
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserDao.findUserByEmail({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};