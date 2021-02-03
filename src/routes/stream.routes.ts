import { Router, Request, Response } from 'express';
import StreamModel from '../MongoDB/models/Stream';
import { IStream } from '../MongoDB/models/Stream';

const router = Router();

router.get('/stream-key', async (req: Request, res: Response) => {
  try {
    const user = await StreamModel.findOne({ user: req.user._id });
    return res.json(user.key);
  } catch (error) {
    return res.status(500).json({ message: 'Can not get sream key' });
  }
});

router.get('/stream-name', async (req: Request, res: Response) => {
  try {
    const user = await StreamModel.findOne({ user: req.user._id });
    return res.json(user.title);
  } catch (error) {
    return res.status(500).json({ message: 'Can not get sream key' });
  }
});

router.post('/set-name', async (req: Request, res: Response) => {
  try {
    await StreamModel.findOne({ user: req.user._id }, async (err: any, element: IStream) => {
      if (!err) {
        const name = req.headers.streamname;
        if (element) {
          element.title = name;
          await element.save();
        }
      }
    });
    res.status(201).json({ message: 'Succses' });
  } catch (error) {
    return res.status(500).json({ message: 'Can not save name sream key' });
  }
});

export default router;
