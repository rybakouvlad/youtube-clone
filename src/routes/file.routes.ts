import fileServ from '../services/fileService';
// import fs from 'fs';
import User from '../MongoDB/models/Users';
import File from '../MongoDB/models/File';
import { UploadedFile } from 'express-fileupload';
import { Request, Response } from 'express';
const fileService = new fileServ();
export default class fileRouters {
  async createDir(req: Request, res: Response) {
    try {
      const { name, type, parent } = req.body;
      const file = new File({ name, type, parent, user: req.user.id });
      const parentFile = await File.findOne({ _id: parent });
      if (!parentFile) {
        file.path = name;
        await fileService.createDir(file);
      } else {
        file.path = `${parentFile.path}\\${file.filename}`;
        await fileService.createDir(file);
        // parentFile.childs.push(file._id);
        // await parentFile.save();
      }
      await file.save();
      return res.json(file);
    } catch (e) {
      console.log(e);
      return res.status(400).json(e);
    }
  }

  async getFiles(req: Request, res: Response) {
    try {
      const files = await File.find({ user: req.user.id, parent: req.query.parent });
      return res.json(files);
    } catch (e) {
      console.log(e);
      return res.status(500).json({ message: 'Can not get files' });
    }
  }

  async uploadFile(req: Request, res: Response) {
    console.log(req);

    const user = await User.findOne({ _id: req.user._id });
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      const sampleFile = req.files.file as UploadedFile;
      const uploadPath = `${process.env.USER_FILE_PATH}` + user._id /* + '/' */ + sampleFile.name;
      console.log(req.files.body);

      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(uploadPath, function (err) {
        if (err) {
          return res.status(500).send(err);
        }

        res.send('File uploaded!');
      });
    } catch (error) {}
  }
}

// import { Router } from 'express';
// const router = Router();

// router.pos

// export default router;
