const express = require("express");
const router = express.Router();
const motivationController = require("../controllers/motivation");

router.get("/", motivationController.getMotivation);
router.get("/newMotivation", motivationController.getNewMotivation);
router.put("/inputMotivation", motivationController.putMotivation);

module.exports = router;
