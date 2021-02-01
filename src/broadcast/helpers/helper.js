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

  // ffmpeg -i rtmp://127.0.0.1:1935/live/nF-8NLNUi  -ss 00:00:01 -vframes 1 /Users/vladrybakov/Documents/GitHub/youtube-clone/src/assets/img1.png
  spawn(ffmpegPath, args);
  // result.stdout.on('data', (data) => {
  //   console.log(`stdout: ${data}`);
  // });

  // result.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });

  // result.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });
};
