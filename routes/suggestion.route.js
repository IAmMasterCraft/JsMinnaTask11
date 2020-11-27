const express = require("express");
const router = express.Router();
const middleware = require("../middlewares/auth.middleware")

const controller = require("../controllers/suggestion.controller");

router.post("/suggest", middleware.verifyToken, controller.suggestItem);

router.get("/suggested", middleware.verifyToken, controller.getSuggestions);

router.get("/suggested/:category", middleware.verifyToken, controller.getSuggestions);

module.exports = router;