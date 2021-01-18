import { Router, Request, Response } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../MongoDB/models/Users';
import createJWToken from '../MongoDB/utils/createJWToken';
const router = Router();

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      console.log(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации',
        });
      }
      const postData: { email: string; password: string } = {
        email: req.body.email,
        password: req.body.password,
      };

      const candidate = await User.findOne({ email: postData.email });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(postData.password, 12);
      const user = new User({ email: postData.email, password: hashedPassword });

      await user.save();

      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);
router.post(
  '/login',
  [check('email', 'Введите корректный email').normalizeEmail().isEmail(), check('password', 'Введите пароль').exists()],
  async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const errors: Result<ValidationError> = validationResult(req);
      console.log(req.body);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при входе в систему',
        });
      }

      const postData: { email: string; password: string } = {
        email: req.body.email,
        password: req.body.password,
      };

      const user = await User.findOne({ email: postData.email });

      if (!user) {
        return res.status(400).json({ message: 'Пользователь не найден' });
      }

      const isMatch = await bcrypt.compare(postData.password, user.password);
      console.log(bcrypt.compare(postData.password, user.password));

      if (isMatch) {
        const token = createJWToken(user);
        console.log('kuku');

        res.json({
          status: 'success',
          token,
        });
      } else {
        res.status(403).json({
          status: 'error',
          message: 'Incorrect password or email',
        });
      }
    } catch (e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);

export default router;
