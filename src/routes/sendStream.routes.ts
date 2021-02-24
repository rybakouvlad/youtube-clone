import { Router, Request, Response } from 'express';
import { sendRtmp } from '../services/sendRtmp';
const router = Router();

router.post('/send', async (req: Request, res: Response) => {
  try {
    console.log(req);
    sendRtmp(req.body.link + '/' + req.body.key, req.body.name);
    return res.json('comments');
  } catch (e) {
    return res.status(500).json({ message: 'Can not get comments' });
  }
});

export default router;
