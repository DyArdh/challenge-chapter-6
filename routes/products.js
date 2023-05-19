const express = require("express");
const router = express.Router();

const products = require("../controllers/products");

router.get("/", products.index);
router.post("/", products.store);
router.get("/:productId", products.show);
router.put("/:productId", products.update);
router.delete("/:productId", products.destroy);

module.exports = router;
