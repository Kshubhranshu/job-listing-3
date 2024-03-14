const express = require("express");
const router = express.Router();
const jobController = require("../controller/job");
const verifyToken = require("../middlewares/verifyToken");

router.post("/create", verifyToken, jobController.createJobPost);
router.get("/job-details/:jobId", jobController.getJobDetailsById);

module.exports = router;
