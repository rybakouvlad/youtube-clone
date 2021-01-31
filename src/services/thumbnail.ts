import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

export const generateVideoThumbnail = (userId: string, videoId: string) => {
  const args = [
    '-y',
    '-i',
    '/Users/vladrybakov/Documents/GitHub/youtube-clone/server/assets/files/' + userId + '/' + videoId,
    '-ss',
    '00:00:02',
    '-vframes',
    '1',
    '-vf',
    'scale=-2:300',
    './server/assets/files/thumbnail/' + videoId + '.png',
  ];
  // -y -i /Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/bigbuck.mp4 -ss 00:00:02 -vframes 1 -vf scale=-2:300 /Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/3.png

  const result = spawn(ffmpegPath, args);
  result.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  result.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  result.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
