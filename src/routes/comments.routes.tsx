import { Router, Request, Response } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
// import bcrypt from 'bcryptjs';
import Comments from '../MongoDB/models/Comments';
// import createJWToken from '../MongoDB/utils/createJWToken';
const router = Router();
//
// router.post(
//     '/register',
//     [
//         check('email', 'Некорректный email').isEmail(),
//         check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
//     ],
//     async (req: Request, res: Response) => {
//         try {
//             const errors: Result<ValidationError> = validationResult(req);
//             console.log(req);
//             if (!errors.isEmpty()) {
//                 return res.status(400).json({
//                     errors: errors.array(),
//                     message: 'Некорректный данные при регистрации',
//                 });
//             }
//             const postData: { email: string; password: string } = {
//                 email: req.body.email,
//                 password: req.body.password,
//             };
//
//             const candidate = await User.findOne({ email: postData.email });
//
//             if (candidate) {
//                 return res.status(400).json({ message: 'Такой пользователь уже существует' });
//             }
//
//             const hashedPassword = await bcrypt.hash(postData.password, 12);
//             const user = new User({ email: postData.email, password: hashedPassword });
//
//             await user.save();
//
//             res.status(201).json({ message: 'Пользователь создан' });
//         } catch (e) {
//             res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
//         }
//     },
// );
router.get('/pullComments', async (req: Request, res: Response) => {
  try {
    const comments = await Comments.find({ user: req.user });
    console.log(req.user);
    return res.json(comments);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Can not get files' });
  }
});
router.post('/create', [check('text', 'Введите комментарий').exists()], async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.user);
  try {
    const errors: Result<ValidationError> = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Комментарий некорректный',
      });
    }
    const comment = new Comments({ text: req.body.text, user: req.user, date: new Date() });

    await comment.save();
    res.status(201).json({ message: 'Комментарий создан' });
  } catch (e) {
    res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
  }
});

export default router;
