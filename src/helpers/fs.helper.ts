import { Injectable } from '@nestjs/common';
import * as path from 'node:path';
import * as fs from 'node:fs';
import * as fsPromises from 'node:fs/promises';

@Injectable()
export class FsHelper {
  private readonly uploadDir = path.join(process.cwd(), 'uploads');

  constructor() {
    if (!fs.existsSync(this.uploadDir)) {
      fs.mkdirSync(this.uploadDir, { recursive: true });
    }
  }

  async uploadFile(file: Express.Multer.File) {
    const fileExt = path.extname(file.originalname).slice(1) || 'dat';
    const fileName = `${Date.now()}-file.${fileExt}`;
    const filePath = path.join(this.uploadDir, fileName);

    await fsPromises.writeFile(filePath, file.buffer);

    return {
      message: 'success',
      fileUrl: fileName,
    };
  }

  async removeFiles(fileNames: string | string[]) {
    const files = Array.isArray(fileNames) ? fileNames : [fileNames];

    for (const file of files) {
      const filePath = path.join(this.uploadDir, file);
      try {
        await fsPromises.unlink(filePath);
      } catch (error) {}
    }

    return {
      message: 'deleted',
    };
  }
}
