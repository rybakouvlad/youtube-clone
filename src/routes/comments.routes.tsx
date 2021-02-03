import { Router, Request, Response } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
import auth from './../middleware/auth.middleware';
import Comments from '../MongoDB/models/Comments';

const router = Router();

router.post('/pullComments', async (req: Request, res: Response) => {
  try {
    const comments = await Comments.find({ video: req.body.videoId });
    return res.json(comments);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Can not get comments' });
  }
});

router.post('/create', auth, [check('text', 'Enter comment.').exists()], async (req: Request, res: Response) => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Comment is incorrect.',
      });
    }
    const comment = new Comments({
      text: req.body.text,
      video: req.body.videoId,
      user: req.user,
      login: req.user.login,
      date: new Date(),
    });

    await comment.save();
    res.status(201).json({ message: 'Comment created.' });
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong, try again.' });
  }
});

export default router;
