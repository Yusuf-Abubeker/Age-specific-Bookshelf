const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User, validate, validateLogin } = require("../models/userModel");

// CREATE (POST) - Register a new user
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the username is already taken
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) return res.status(400).send("Username already taken.");

    // Hash the password before storing it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Create a new user
    const user = new User({
      fullname: req.body.fullname,
      username: req.body.username,
      password: hashedPassword,
    });

    // Save the user to the database
    await user.save();

    // Generate and send an authentication token
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
      _id: user._id,
      fullname: user.fullname,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// LOGIN (POST) - Authenticate a user
router.post("/login", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the username exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).send("Invalid username or password.");

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword)
      return res.status(401).send("Invalid username or password.");

    // Generate and send an authentication token
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({ token });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});
// READ (GET all users)
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// READ (GET a specific user by ID)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).send("User not found.");
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// UPDATE (PUT)
router.put("/:id", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Hash the password before updating it
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Update the user in the database
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        fullname: req.body.fullname,
        username: req.body.username,
        password: hashedPassword,
      },
      { new: true }
    );

    // If the user is not found, return a 404 error
    if (!user) return res.status(404).send("User not found.");

    // Send the updated user
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);

    // If the user is not found, return a 404 error
    if (!user) return res.status(404).send("User not found.");

    // Send the deleted user
    res.send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
