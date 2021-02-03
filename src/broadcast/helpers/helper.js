import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

export const generateStreamThumbnail = (stream_key) => {
  const args = [
    '-y',
    '-i',
    'http://127.0.0.1:8080/live/' + stream_key + '/index.m3u8',
    '-ss',
    '00:00:02',
    '-vframes',
    '1',
    '-vf',
    'scale=-2:300',
    './server/assets/files/thumbnail/' + stream_key + '.png',
  ];

  spawn(ffmpegPath, args);
};
