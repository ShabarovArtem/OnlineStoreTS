import express from 'express';
import { UsersController } from '../controllers';
import { body } from 'express-validator';
import { ValidateBody } from '../middleware';

export const router = express.Router();
const typesController = new TypesController();

router.post("/",
    body('name').isString(),
    ValidateBody,
    async (req, res) => {
    await typesController.create(req, res)
});

router.get("/", async (req, res) => {
    await typesController.getAll(req, res)
});
