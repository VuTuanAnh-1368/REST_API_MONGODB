const express = require("express");
const router = express.Router();
const yourController = require("../controllers/yourController.js");

// Route: Create Data
router.post("/", yourController.createData);

// Route: getAllData
router.get("/data", yourController.getAllData);

// Route: getData(ID)
router.get("/", yourController.getDataById);

// Route: UpdateData(ID)
router.put("/", yourController.updateDataById);

// Route: DeleteData(ID)
router.delete("/", yourController.deleteDataById);

module.exports = router;