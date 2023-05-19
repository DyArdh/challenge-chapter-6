const express = require("express");
const router = express.Router();

const suppliers = require("../controllers/suppliers");

router.get("/", suppliers.index);
router.post("/", suppliers.store);
router.get("/:supplierId", suppliers.show);
router.put("/:supplierId", suppliers.update);
router.delete("/:supplierId", suppliers.destroy);

module.exports = router;
