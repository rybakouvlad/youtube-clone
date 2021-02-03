/* eslint-disable @typescript-eslint/no-var-requires */

const NodeMediaServer = require('node-media-server'),
  config = require('./config/default').rtmp_server;

const nms = new NodeMediaServer(config);
import StreamModel from '../MongoDB/models/Stream';
import { generateStreamThumbnail } from './helpers/helper';
import { generateVideoThumbnail } from '../services/thumbnail';
import { recordStream } from '../services/recordStream.ts';
import File from '../MongoDB/models/File';
nms.on('prePublish', async (id, StreamPath, args) => {
  const stream_key = getStreamKeyFromStreamPath(StreamPath);
  console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);

  StreamModel.findOne({ key: stream_key }, (err, user) => {
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
nms.on('postPublish', (id, StreamPath, args) => {
  console.log('[NodeEvent on postPublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
  const stream_key = getStreamKeyFromStreamPath(StreamPath);
  StreamModel.findOne({ key: stream_key }, (err, key) => {
    if (!err) {
      if (!key) {
        const session = nms.getSession(id);
        session.reject();
      } else {
        key.lastId = id;
        key.save();
        generateStreamThumbnail(stream_key);
        recordStream(stream_key, key.user, id);
      }
    }
  });
});
nms.on('doneConnect', (id, args) => {
  console.log('[NodeEvent on doneConnect]', `id=${id} args=${JSON.stringify(args)}`);
  try {
    StreamModel.findOne({ lastId: id }, async (err, stream) => {
      if (err) throw err;
      if (!err) {
        if (stream) {
          console.log(stream);
          const dbFile = new File({
            name: id + '.mp4',
            path: '',
            user: stream.user,
            title: stream.title,
          });
          await dbFile.save();
        }
      }
    });
  } catch (error) {}
});
const getStreamKeyFromStreamPath = (path) => {
  const parts = path.split('/');
  return parts[parts.length - 1];
};

export default nms;
