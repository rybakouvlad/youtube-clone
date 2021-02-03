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

  spawn(ffmpegPath, args);
};
