const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const postsController = require("../controllers/posts");
const { ensureAuth } = require("../middleware/auth");

//Main Routes
router.get("/", homeController.getIndex);
router.get("/profile", ensureAuth, postsController.getProfile);

//Routes for user login/signup
router.get("/compliments", authController.getLogin);
router.post("/compliments", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/motivation", authController.getSignup);
router.post("/motivation", authController.postSignup);
//check out the auth (do I need?)
router.get("*", (req, res) => {
  return res.send(`route ${req.url} has not been implemented`); //wildcard used in production but not for final product to help troubleshoot where issue is
});
module.exports = router;
