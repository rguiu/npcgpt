import 'dotenv/config';
import express from "express";
import busboy from 'connect-busboy';
import bodyParser from 'body-parser';
import cors from 'cors';
import errorHandler from './util/error-handler.mjs';
import logger from './util/logger.mjs';

import npcController from './controllers/npc.controller.js'

const DEFAULT_PORT = 3000;
const app = express();

const applicationKey = process.env.API_KEY;

const authenticate = (req, res, next) => {
    const { 'x-api-key': authorization } = req.headers;
    if (!authorization || authorization !== applicationKey) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    next();
  };

async function start(port) {
    // Apply the authentication middleware to all routes
    app.use(authenticate);

    app.use(bodyParser.json({ limit: '200mb' }));
    app.use(bodyParser.urlencoded({
        limit: '200mb', extended: true,
    }));
    app.use(cors());

    app.use(busboy());

    app.use('/chat', npcController);

    app.use(errorHandler);

    app.listen(port, () => {
        logger.info(`Server listening on port ${port}`);
    });
}

const port = process.argv.length > 2 ? process.argv[2] : DEFAULT_PORT;
logger.info(`Trying to star on port ${port}`);
start(port);


