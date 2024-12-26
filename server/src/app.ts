import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

export default async function createApp() {
    const app = express();

    app.use(cors());

    app.use(bodyParser.json());

    // app.use(routes);

    return app;
}

