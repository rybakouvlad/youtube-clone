import { Router, Request, Response } from 'express';
import { StreamRtmp } from '../services/sendRtmp';
const router = Router();

const procces = new StreamRtmp();

router.post('/send', async (req: Request, res: Response) => {
  try {
    const pid: number | string = procces.start(req.body.link + '/' + req.body.key, req.body.name);

    return res.status(200).json({ message: 'Stream started', pid: pid });
  } catch (e) {
    return res.status(500).json({ message: 'Stream feiled' });
  }
});
router.post('/stop', async (req: Request, res: Response) => {
  try {
    procces.stop(req.body.pid);

    return res.status(200).json({ message: 'Stream stoped' });
  } catch (e) {
    return res.status(500).json({ message: 'Failed to delete stream' });
  }
});
export default router;
