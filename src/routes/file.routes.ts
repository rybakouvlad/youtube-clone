import fileServ from '../services/fileService';
// import fs from 'fs';
import User from '../MongoDB/models/Users';
import File from '../MongoDB/models/File';
import { UploadedFile } from 'express-fileupload';
import { Request, Response } from 'express';
import { generateVideoThumbnail } from '../services/thumbnail';
import shortid from 'shortid';
const fileService = new fileServ();
export default class fileRouters {
  async getAllFiles(req: Request, res: Response) {
    try {
      const files = await File.find({});
      return res.json(files);
    } catch (error) {
      return res.status(500).json({ message: 'Can not get files' });
    }
  }

  async getFile(req: Request, res: Response) {
    try {
      const files = await File.findOne({ _id: req.body.filename });
      return res.json(files);
    } catch (e) {
      return res.status(500).json({ message: 'Can not get files' });
    }
  }

  async uploadFile(req: Request, res: Response) {
    // console.log(req);

    const user = await User.findOne({ _id: req.user._id });
    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
      const sampleFile = req.files.file as UploadedFile;
      const fileName = shortid.generate() + '.mp4';
      const uploadPath = `${process.env.USER_FILE_PATH}` + user._id + '/' + fileName;
      // console.log(req.files.file);
      /* NEW FOLDER */
      await fileService.checkDir(new File({ user: user._id, fileName: '' }));
      // Use the mv() method to place the file somewhere on your server
      sampleFile.mv(uploadPath, async function (err) {
        if (err) {
          return res.status(500).send(err);
        }

        const dbFile = new File({
          name: fileName,
          size: sampleFile.size,
          path: sampleFile.tempFilePath,
          user: req.user,
        });

        await dbFile.save();
        generateVideoThumbnail(req.user._id, dbFile.name);
        res.send('File uploaded!');
      });
    } catch (error) {}
  }
}

// import { Router } from 'express';
// const router = Router();

// router.pos

// export default router;
