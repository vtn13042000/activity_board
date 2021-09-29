const express = require("express");
const repository = require("../models/repository");
const { randomBytes } = require("crypto");
const argon2 = require("argon2");
const router = express.Router();

router.post("/register", async (req, res) => {
  console.log("hello");
  const username = req.body.username;
  const password = req.body.password;

  console.log("HELLO");
  // console.log(repository.user.);
  if (!username || !password) {
    return res.status(400).json({ msg: "password or username is missing" });
  }
  const userExist = await repository.user.findOne({
    where: { username: username },
  });
  if (userExist) {
    return res.status(400).json({ msg: "username exists" });
  }
  const salt = randomBytes(32);
  const newUser = await repository.user.create({
    username,
    password: await argon2.hash(password, { salt }),
  });
  return res.status(200).json({ msg: "success" });
});

router.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(400).json({ msg: "invalid login" });
  }

  const user = await repository.user.findOne({ where: { username } });
  if (!user) {
    return res.status(404).json({ msg: "username does not exist" });
  }

  if (await argon2.verify(user.password, password)) {
    return res.status(200).json({ msg: "success" });
  }
  return res.status(401).json({ msg: "wrong password" });
});

module.exports = router;
