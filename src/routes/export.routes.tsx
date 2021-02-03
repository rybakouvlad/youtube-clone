import express, { Router } from 'express';
import videoRouter from './video.routes';
import mongoRouter from './mongo.routers';
import fileRouter from './file.routes';
import streamRouter from './stream.routes';
import cors from 'cors';
const router = Router();
const file = new fileRouter();

router.use(cors());
router.use('/play', videoRouter);
router.use('/', mongoRouter);
router.get('/file/all', file.getAllFiles);
router.post('/file/single', file.getFile);
router.use('/stream', streamRouter);
router.use('/image', express.static('./server/assets/files/thumbnail'));
router.use('/video', express.static('./server/assets/files'));
export default router;
