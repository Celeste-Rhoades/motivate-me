const express = require("express");
const router = express.Router();
const complimentsController = require("../controllers/compliments");

router.get("/", complimentsController.getCompliment);
router.get("/newCompliment", complimentsController.getNewCompliment);
router.put("/inputCompliment", complimentsController.putCompliment);

module.exports = router;
