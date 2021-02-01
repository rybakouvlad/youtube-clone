import { spawn } from 'child_process';
import ffmpegPath from 'ffmpeg-static';

export const recordStream = (stream_key: string) => {
  const args = [
    '-i',
    'rtmp://127.0.0.1:1935/live/' + stream_key,
    '-c',
    'copy',
    '-flags',
    '+global_header',
    '-f',
    'mp4',
    'movflags=frag_keyframe+empty_moov',
    '-reset_timestamps',
    '1',
    './server/assets/files/thumbnail/' + stream_key + '.mp4',
  ];
  // ffmpeg -i rtmp://127.0.0.1:1935/live/Ulpsd-Zvt -c copy -flags +global_header -f mp4 movflags=frag_keyframe+empty_moov -reset_timestamps 1 /Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/test%d.mp4
  // -y -i http://127.0.0.1:8080/live/NhWyGgIzq/index.m3u8 -ss 00:00:02 -vframes 1 -vf scale=-2:300 /Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/3.png

  const ls = spawn(ffmpegPath, args);
  ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  ls.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
// ffmpeg -i rtmp://127.0.0.1:1935/live/Ulpsd-Zvt -c copy -flags +global_header -f movflags=+faststart -reset_timestamps 1 /Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/test%d.mp4

//ffmpeg -i http://127.0.0.1:8080/live/Ulpsd-Zvt/index.m3u8 -bsf:a aac_adtstoasc -vcodec copy -c copy -crf 50 /Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/file.mp4
// ffmpeg -i rtmp://127.0.0.1:1935/live/Ulpsd-Zvt -c copy -flags +global_header -f mp4 movflags=frag_keyframe+empty_moov -reset_timestamps 1 /Users/vladrybakov/Documents/GitHub/youtube-clone/src/files/test%d.mp4
