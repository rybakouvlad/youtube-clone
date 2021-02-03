import fs from 'fs';
import { IFile } from '../MongoDB/models/File';

export default class FileService {
  createDir(file: IFile) {
    const filePath = `${process.env.USER_FILE_PATH}${file.user}/${file.path}`;
    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath);
          return resolve({ message: 'File was created' });
        } else {
          return reject({ message: 'File already exist' });
        }
      } catch (e) {
        return reject({ message: 'File error' });
      }
    });
  }
  checkDir(file: IFile) {
    const filePath = `${process.env.USER_FILE_PATH}${file.user}/${file.path}`;
    try {
      fs.statSync(filePath);
    } catch (err) {
      if (err.code === 'ENOENT') {
        this.createDir(file);
      }
    }
  }
}
