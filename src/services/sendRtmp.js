import ffmpegPath from 'ffmpeg-static';
import { spawn } from 'child_process';
import process from 'process';

export class StreamRtmp {
  constructor() {
    this.bad = '';
    // this.controleler = new AbortController();
    // this.signal = this.controleler.signal;
  }

  start(path, fileName) {
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

    this.bat = spawn(ffmpegPath, args);

    this.bat.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    this.bat.stderr.on('data', (data) => {
      console.error(data.toString());
      this.bat = null;
    });

    this.bat.on('exit', (code) => {
      console.log(`Child exited with code ${code}`);
    });

    return this.bat.pid;
  }

  stop(pid) {
    process.kill(pid);
  }
}

//ffmpeg -re  -stream_loop -1  -i /Users/vladrybakov/Documents/GitHub/youtube-clone/server/assets/files/6038bb825731da223668157b/WKI405AH.mp4 -s 1920x1080 -c:v libx264 -b:v 2M -c:a copy -strict -2 -flags +global_header -bsf:a aac_adtstoasc -bufsize 2100k -f flv rtmp://178.124.178.250:1935/live/dvGJqfXhz
