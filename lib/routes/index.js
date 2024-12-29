import express from "express";
import { router as typesController } from "./typesRouter";
export const router = express.Router();
router.use('/type', typesController);
