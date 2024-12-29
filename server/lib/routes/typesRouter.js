import express from 'express';
import { TypesController } from '../controllers';
import { body } from 'express-validator';
import { ValidateBody } from '../middleware';
export const router = express.Router();
const typesController = new TypesController();
router.post("/", body('name').isString(), ValidateBody, async (req, res) => {
    await typesController.add(req, res);
});
router.get("/", async (req, res) => {
    await typesController.getAll(req, res);
});
