import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import {router} from './routes';
import fileUpload from "express-fileupload";

export default async function createApp() {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(fileUpload());

    app.use('/api', router);

    return app;
}

