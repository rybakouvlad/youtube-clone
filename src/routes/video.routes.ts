import { Router, Request, Response } from 'express';
import fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';

// const comand = ffmpeg();

const router = Router();

router.get('/video', (req: Request, res: Response) => {
  console.log(req);

  const range = req.headers.range;
  if (!range) {
    res.status(400).send('Requires Range header');
  }

  // get video stats (about 61MB)
  const videoPath = process.env.USER_FILE_PATH + 'bigbuck.mp4';
  const videoSize = fs.statSync(videoPath).size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    'Content-Range': `bytes ${start}-${end}/${videoSize}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': contentLength,
    'Content-Type': 'video/mp4',
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});

router.get('/play/:filename', () => {
  console.log('kuku');
  const videoPath = process.env.USER_FILE_PATH + 'bigbuck.mp4';
  const outStream = fs.createWriteStream(videoPath);

  // ar outStream = fs.createWriteStream('/path/to/output.mp4');

  ffmpeg(videoPath)
    .videoCodec('libx264')
    .audioCodec('libmp3lame')
    .size('320x240')
    .on('error', function (err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function () {
      console.log('Processing finished !');
    })
    .pipe(outStream, { end: true });
});

export default router;
