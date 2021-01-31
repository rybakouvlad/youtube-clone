/* eslint-disable @typescript-eslint/no-var-requires */

const CronJob = require('cron').CronJob,
  request = require('request'),
  helpers = require('../helpers/helper');

const job = new CronJob(
  '*/5 * * * * *',
  function () {
    request.get('http://127.0.0.1:' + '8080' + '/api/streams', function (error, response, body) {
      const streams = JSON.parse(body);
      if (typeof (streams['live'] !== undefined)) {
        const live_streams = streams['live'];
        for (const stream in live_streams) {
          if (!live_streams.hasOwnProperty(stream)) continue;
          helpers.generateStreamThumbnail(stream);
        }
      }
    });
  },
  null,
  true,
);

export default job;
