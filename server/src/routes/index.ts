import express from "express";
import {router as usersRouter} from "./userRouter";


export const router = express.Router();

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/basket', userBasketDeviceRouter)
router.use('/rating', ratingRouter)