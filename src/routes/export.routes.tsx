import { Router } from 'express';
import videoRouter from './video.routes';
import mongoRouter from './mongo.routers';
import fileRouter from './file.routes';
const router = Router();
const file = new fileRouter();

router.use('/play', videoRouter);
router.use('/', mongoRouter);
router.get('/file/all', file.getAllFiles);
router.post('/file/single', file.getFile);
export default router;
