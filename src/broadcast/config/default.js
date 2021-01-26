const config = {
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
    /* !!!!! НЕ УДАЛЯТЬ !!!! */
    // trans: {
    //   ffmpeg: '/usr/local/Cellar/ffmpeg/4.3.1_7/bin/ffmpeg',
    //   tasks: [
    //     {
    //       app: 'live',
    //       hls: true,
    //       hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
    //       dash: true,
    //       dashFlags: '[f=dash:window_size=3:extra_window_size=5]',
    //     },
    //   ],
    // },
  },
};

module.exports = config;
