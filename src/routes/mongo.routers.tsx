import { Router, Request, Response } from 'express';
import { check, validationResult, Result, ValidationError } from 'express-validator';
import bcrypt from 'bcryptjs';
import User from '../MongoDB/models/Users';
import createJWToken from '../MongoDB/utils/createJWToken';
import FileService from '../services/fileService';
import File from '../MongoDB/models/File';
import StreamModel from '../MongoDB/models/Stream';
import shortid from 'shortid';
const router = Router();
const fileService = new FileService();

router.post(
  '/register',
  [
    check('email', 'Некорректный email').isEmail(),
    check('password', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
    check('login', 'Минимальная длина пароля 6 символов').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors: Result<ValidationError> = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Некорректный данные при регистрации',
        });
      }
      const postData: { email: string; password: string; login: string } = {
        email: req.body.email,
        password: req.body.password,
        login: req.body.login,
      };

      const candidate = await User.findOne({ email: postData.email });

      if (candidate) {
        return res.status(400).json({ message: 'Такой пользователь уже существует' });
      }

      const hashedPassword = await bcrypt.hash(postData.password, 12);
      const user = new User({
        email: postData.email,
        password: hashedPassword,
        login: postData.login,
      });
      const stream = new StreamModel({
        key: shortid.generate(),
        user: user,
        title: 'no name',
        lastId: '',
      });
      await stream.save();
      await user.save();
      await fileService.createDir(new File({ user: user._id, fileName: '' }));
      res.status(201).json({ message: 'Пользователь создан' });
    } catch (e) {
      console.log(e);

      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' });
    }
  },
);
router.post(
  '/login',
  [check('email', 'Введите корректный email').normalizeEmail().isEmail(), check('password', 'Введите пароль').exists()],
  async (req: Request, res: Response) => {
    // console.log(req.body);
    try {
      const errors: Result<ValidationError> = validationResult(req);
      // console.log(req.body);
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
      // console.log(bcrypt.compare(postData.password, user.password));

      if (isMatch) {
        const token = createJWToken(user);
        // console.log('kuku');

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

router.post('/getUserLogin', async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.headers.userid });
    console.log('$$$$$$$', user);
    return res.json(user.login);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: 'Can not get user' });
  }
});

export default router;
