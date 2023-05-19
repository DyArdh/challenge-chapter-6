const express = require("express");
const router = express.Router();

const components = require("../controllers/components");

router.get("/", components.index);
router.post("/", components.store);
router.get("/:componentId", components.show);
router.put("/:componentId", components.update);
router.delete("/:componentId", components.destroy);

module.exports = router;
