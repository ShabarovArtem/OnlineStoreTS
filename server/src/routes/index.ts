import express from "express";

import {router as usersController} from "./usersRouter";
import {router as typesController} from "./typesRouter";
import {router as brandsController} from "./brandRouter";
import {router as devicesController} from "./deviceRouter";

export const router = express.Router();

router.use('/user', usersController)
router.use('/type', typesController)
router.use('/brand', brandsController)
router.use('/device', devicesController)
