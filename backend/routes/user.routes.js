const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");
const { BlackListModel } = require("../models/blacklist");

const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  const { name, email, gender, password, age, city, is_married } = req.body;
  try {
    let val = await UserModel.findOne({ email });
    if (val) {
      return res.status(200).json({ msg: `User already exist, please login` });
    }
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        let newUser = new UserModel({
          name,
          email,
          gender,
          password: hash,
          age: Number(age),
          city,
          is_married,
        });
        await newUser.save();
        return res.status(200).json({
          msg: `New user registered`,
          user: { name, email, gender, password, age, city, is_married },
        });
      }
    });
  } catch (error) {
    res.send(400).json({ error });
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await UserModel.findOne({ email });
    if (!user) {
      return res
        .status(200)
        .json({ msg: `User doesnt exist, please register` });
    }
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(200).json({ msg: `Password Doesnt Match` });
      } else if (result) {
        let token = jwt.sign({ name: user.name, userID: user._id }, "masai", {
          expiresIn: "7d",
        });
        return res.status(200).json({ msg: `Logged in`, token });
      }
    });
  } catch (error) {
    res.send(400).json({ error });
  }
});

userRouter.get("/logout", async (req, res) => {
  const token = req.headers.authorization;
  try {
    let val = new BlackListModel({ token });
    await val.save();
    res.send(400).json({ msg: `Logged Out` });
  } catch (error) {
    res.send(400).json({ error });
  }
});

module.exports = { userRouter };
