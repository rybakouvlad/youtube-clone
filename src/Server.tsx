import fs from 'fs';
import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from 'App';
import Html from './Html/Server';
import bodyParser from 'body-parser';
import auth from './middleware/auth.middleware';
import fileUpload from 'express-fileupload';
import fileRouters from './routes/file.routes';
import commentRoutes from './routes/comments.routes';
import routers from './routes/export.routes';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const mediaServer = require('./broadcast/media_server');

import './MongoDB/mongoDB';

const server = express();
const jsFiles: Array<string> = [];
const fileRouter = new fileRouters();

fs.readdirSync('./dist/assets').forEach((file) => {
  if (file.split('.').pop() === 'js') jsFiles.push(`/assets/${file}`);
});
server.use(express.json());
// server.use('/api/files', fileRouter.uploadFile);
server.use(fileUpload({}));
server.post('/api/files', auth, fileRouter.uploadFile);

server.use('/assets', express.static('./dist/assets'));
server.use(bodyParser.json());
server.use('/api/comment', auth, commentRoutes);
server.use('/api', routers);

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
