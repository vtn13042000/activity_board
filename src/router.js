const express = require("express");
const authController = require("./controllers/auth");
const router = express.Router();

router.use("/auth", authController);

router.use("/test", authController);

router1 = express.Router();
router1.get("/", (req, res) => {
  // res.send('okay you got me')
  res.json({ msg: "long time no see" });
});

router.use("/home", router1);

module.exports = router;
