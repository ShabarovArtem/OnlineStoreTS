import express from 'express';
import { BrandsController } from '../controllers';
import { body } from 'express-validator';
import { ValidateBody } from '../middleware';
export const router = express.Router();
const brandsController = new BrandsController();
router.post("/", body('name').isString(), ValidateBody, async (req, res) => {
    await brandsController.add(req, res);
});
router.get("/", async (req, res) => {
    await brandsController.getAll(req, res);
});
