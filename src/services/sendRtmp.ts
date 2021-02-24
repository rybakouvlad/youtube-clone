import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

export const sendRtmp = (path: string, fileName: string) => {
  //   const args = [
  //     '-re',
  //     '-i',
  //     './server/assets/files/rtmp/' + fileName,
  //     '-vcodec',
  //     'libx264',
  //     '-profile:v',
  //     'main',
  //     '-preset:v',
  //     'medium',
  //     '-r',
  //     '30',
  //     'g',
  //     '60',
  //     '-keyint_min',
  //     '60',
  //     '-sc_threshold',
  //     '0',
  //     '-b:v',
  //     '2500k',
  //     '-maxrate',
  //     ' 2500k',
  //     '-bufsize',
  //     '2500k',
  //     '-filter:v',
  //     'scale="trunc(oha/2)2:720"',
  //     '-sws_flags',
  //     'anczos+accurate_rnd',
  //     '-acodec',
  //     'libfdk_aac',
  //     '-b:a',
  //     '96k',
  //     '-ar',
  //     '48000',
  //     '-ac',
  //     '2',
  //     '-f',
  //     path,
  //   ];

  const args = [
    '-re',
    '-i',
    './server/assets/files/rtmp/' + fileName,
    // '/Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/rtmp/ydz6AU_cL.mp4',
    '-c:v',
    'libx264',
    '-b:v',
    '2M',
    '-c:a',
    'copy',
    '-strict',
    '-2',
    '-flags',
    '+global_header',
    '-bsf:a',
    'aac_adtstoasc',
    '-bufsize',
    '2100k',
    '-f',
    'flv',
    path,
  ];

  const bat = spawn(ffmpegPath, args);

  bat.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  bat.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  bat.on('exit', (code) => {
    console.log(`Child exited with code ${code}`);
  });
};

// ffmpeg -re -i ~/INPUT_FILE -vcodec libx264 -profile:v main -preset:v medium -r 30 -g 60 -keyint_min 60 -sc_threshold 0 -b:v 2500k -maxrate 2500k -bufsize 2500k -filter:v scale="trunc(oha/2)2:720" -sws_flags  lanczos+accurate_rnd -acodec libfdk_aac -b:a 96k -ar 48000 -ac 2 -f flv rtmp://live.twitch.tv/app/STREAM_KEY
//ffmpeg -re -i /Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/rtmp/ydz6AU_cL.mp4 -c:v libx264 -b:v 2M -c:a copy -strict -2 -flags +global_header -bsf:a aac_adtstoasc -bufsize 2100k -f flv rtmp://a.rtmp.youtube.com/live2/aczh-9acw-d17m-wd95-03mp
