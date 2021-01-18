import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from 'App';
import Html from './Html/Server';
import bodyParser from 'body-parser';
import auth from './middleware/auth.middleware';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mediaServer = require('./broadcast/media_server');

import './MongoDB/mongoDB';
import MongoRouter from './routes/mongo.routers';

const server = express();
const jsFiles: Array<string> = [];

fs.readdirSync('./dist/assets').forEach((file) => {
  if (file.split('.').pop() === 'js') jsFiles.push(`/assets/${file}`);
});

server.use('/assets', express.static('./dist/assets'));
server.use(bodyParser.json());
server.use('/api', MongoRouter);
server.get('/', auth, async (req, res) => {
  try {
    console.log('midleware');

    res.json(200);
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});
server.get('*', async (req, res) => {
  ReactDOMServer.renderToNodeStream(
    <Html scripts={jsFiles}>
      <StaticRouter location={req.url} context={{}}>
        <App />
      </StaticRouter>
    </Html>,
  ).pipe(res);
});

server.listen(process.env.SERVER_PORT, () => console.log(`Listening on port ${process.env.SERVER_PORT}`));

mediaServer.run();
