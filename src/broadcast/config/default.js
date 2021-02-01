const config = {
  // server: {
  //   secret: 'kjVkuti2xAyF3JGCzSZTk0YWM5JhI9mgQW4rytXc',
  //   port: 3333,
  // },
  rtmp_server: {
    rtmp: {
      port: 1935,
      chunk_size: 60000,
      gop_cache: true,
      ping: 30,
      ping_timeout: 60,
    },
    http: {
      port: 8080,
      mediaroot: './server/media',
      allow_origin: '*',
    },
    trans: {
      ffmpeg: process.env.FFMPEG_URL_LOCAL,
      tasks: [
        {
          app: 'live',
          hls: true,
          hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
          dash: true,
          dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
        },
        // {
        //   app: 'live',
        //   mp4: true,
        //   mp4Flags: '[movflags=frag_keyframe+empty_moov]',
        // },
      ],
    },
  },
};

module.exports = config;
