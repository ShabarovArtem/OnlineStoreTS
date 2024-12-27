import express from "express";
import {UsersController} from "../controllers";
import {body} from "express-validator";

export const router = express.Router();
const usersController = new UsersController();

router.post("/register", usersController.registration.bind(usersController));
router.post("/login", usersController.login.bind(usersController));
router.get("/check", usersController.check.bind(usersController))