import { Router, Request, Response } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
// import bcrypt from 'bcryptjs';
import auth from './../middleware/auth.middleware';

import Comments from '../MongoDB/models/Comments';
// import createJWToken from '../MongoDB/utils/createJWToken';
const router = Router();

router.post('/pullComments', async (req: Request, res: Response) => {
  try {
    const comments = await Comments.find({ video: req.body.videoId });
    // console.log(req.user);
    return res.json(comments);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Can not get comments' });
  }
});
router.post('/create', auth, [check('text', 'Введите комментарий').exists()], async (req: Request, res: Response) => {
  // console.log('7777', req.body);
  // console.log(req.user);
  try {
    const errors: Result<ValidationError> = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Комментарий некорректный',
      });
    }
    const comment = new Comments({ text: req.body.text, video: req.body.videoId, user: req.user, date: new Date() });

    await comment.save();
    res.status(201).json({ message: 'Комментарий создан' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

export default router;
