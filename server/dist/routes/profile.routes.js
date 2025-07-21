"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("../middlewares/multer"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const profile_controller_1 = require("../controllers/profile.controller");
const router = express_1.default.Router();
// Update entrepreneur profile
router.post("/entrepreneur", auth_middleware_1.isAuthenticated, multer_1.default.single("avatar"), profile_controller_1.updateEntrepreneurProfile);
// Update investor profile
router.post("/investor", auth_middleware_1.isAuthenticated, multer_1.default.single("avatar"), profile_controller_1.updateInvestorProfile);
// get all entrepreneurs
router.get("/entrepreneurs", auth_middleware_1.isAuthenticated, profile_controller_1.getAllEntrepreneurs);
exports.default = router;
