import { Router, Request, Response } from 'express';
import User from '../MongoDB/models/Users';

const router = Router();

router.get('/stream-key', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    return res.json(user.stream_key);
  } catch (error) {
    return res.status(500).json({ message: 'Can not get sream key' });
  }
});

export default router;
