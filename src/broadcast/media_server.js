/* eslint-disable @typescript-eslint/no-var-requires */

const NodeMediaServer = require('node-media-server'),
  config = require('./config/default').rtmp_server;

const nms = new NodeMediaServer(config);
import User from '../MongoDB/models/Users';
import { generateStreamThumbnail } from './helpers/helper';
nms.on('prePublish', async (id, StreamPath, args) => {
  const stream_key = getStreamKeyFromStreamPath(StreamPath);
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

  User.findOne({ stream_key: stream_key }, (err, user) => {
    if (!err) {
      if (!user) {
        const session = nms.getSession(id);
        session.reject();
      } else {
        generateStreamThumbnail(stream_key);
      }
    }
  });
});

const getStreamKeyFromStreamPath = (path) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};

export default nms;
