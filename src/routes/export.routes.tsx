import { Router } from 'express';
import videoRouter from './video.routes';
import mongoRouter from './mongo.routers';

const router = Router();

router.use('/play', videoRouter);
router.use('/', mongoRouter);
export default router;
