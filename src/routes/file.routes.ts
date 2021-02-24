import fileServ from '../services/fileService';
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
      res.set('Access-Control-Allow-Origin', '*');
      return res.json(files);
    } catch (error) {
      return res.status(500).json({ message: 'Can not get files' });
    }
  }

  async getFile(req: Request, res: Response) {
    try {
      const files = await File.findOne({ _id: req.headers.filename });
      return res.json(files);
    } catch (e) {
      return res.status(500).json({ message: 'Can not get files' });
    }
  }

  async uploadFile(req: Request, res: Response) {
    const user = await User.findOne({ _id: req.user._id });

    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      const sampleFile = req.files.file as UploadedFile;
      const fileName = shortid.generate() + '.mp4';
      const uploadPath = `${process.env.USER_FILE_PATH}` + user._id + '/' + fileName;

      fileService.checkDir(new File({ user: user._id, fileName: '' }));

      sampleFile.mv(uploadPath, async function (err) {
        if (err) {
          return res.status(500).send(err);
        }

        const dbFile = new File({
          name: fileName,
          size: sampleFile.size,
          path: sampleFile.tempFilePath,
          user: req.user,
          title: req.headers.filetitle,
        });

        await dbFile.save();
        generateVideoThumbnail(req.user._id, dbFile.name);
        res.send('File uploaded!');
      });
    } catch (error) {}
  }

  async uploadFileRtmp(req: Request, res: Response) {
    // const user = await User.findOne({ _id: req.user._id });
    // console.log(req);

    try {
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
      }

      const sampleFile = req.files.file as UploadedFile;
      const fileName = shortid.generate() + '.mp4';
      const uploadPath = `${process.env.USER_FILE_PATH}` + 'rtmp' + '/' + fileName;

      // fileService.checkDir(new File({ user: user._id, fileName: '' }));

      sampleFile.mv(uploadPath, async function (err) {
        if (err) {
          return res.status(500).send(err);
        }

        // const dbFile = new File({
        //   name: fileName,
        //   size: sampleFile.size,
        //   path: sampleFile.tempFilePath,
        //   user: req.user,
        //   title: req.headers.filetitle,
        // });

        // await dbFile.save();
        // generateVideoThumbnail(req.user._id, dbFile.name);
        res.status(200).json({
          message: 'FileUpload',
          fileName: fileName,
        });
      });
    } catch (error) {}
  }
}
