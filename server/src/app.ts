import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {router} from './routes';

export default async function createApp() {
    const app = express();

    app.use(cors());

    app.use(bodyParser.json());

    app.use('/api', router)

    return app;
}

