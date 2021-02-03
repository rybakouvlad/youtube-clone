import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

export const recordStream = (stream_key: string, path: string, name: string) => {
  const args = [
    '-y',
    '-i',
    'rtmp://127.0.0.1:1935/live/' + stream_key,
    '-c',
    'copy',
    '-flags',
    '+global_header',
    '-f',
    'mp4',
    '-movflags',
    'frag_keyframe',
    'empty_moov',
    '-reset_timestamps',
    '1',
    './server/assets/files/' + path + '/' + name + '.mp4',
  ];

  const screenArgs = [
    '-i',
    'rtmp://127.0.0.1:1935/live/' + stream_key,
    '-ss',
    '00:00:01',
    '-vframes',
    '1',
    './server/assets/files/thumbnail/' + name + '.mp4.png',
  ];

  spawn(ffmpegPath, screenArgs, {
    timeout: 1000,
  });
  spawn(ffmpegPath, args);
};
