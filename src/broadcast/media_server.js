/* eslint-disable @typescript-eslint/no-var-requires */
const NodeMediaServer = require('node-media-server'),
  config = require('./config/default').rtmp_server,
  nms = new NodeMediaServer(config);

// nms.on('prePublish', async (id, StreamPath, args) => {
//   const stream_key = getStreamKeyFromStreamPath(StreamPath);
//   console.log('[NodeEvent on prePublish]', `id=${id} StreamPath=${StreamPath} args=${JSON.stringify(args)}`);
// });

// const getStreamKeyFromStreamPath = (path) => {
//   const parts = path.split('/');
//   return parts[parts.length - 1];
// };

module.exports = nms;
