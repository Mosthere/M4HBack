import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ImageUploadPipe implements PipeTransform {
  private readonly allowedMimeTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
  ]

  private readonly maxSizeInBytes = 204800;
  transform(file: Express.Multer.File) {
    if(!file){
      throw new BadRequestException('No file uploaded')
    }

    if(!this.allowedMimeTypes.includes(file.mimetype)){
      throw new BadRequestException('Invalid file type')
    }

    if(file.size > this.maxSizeInBytes){
      throw new BadRequestException('File too large')
    }
    return file
  }
}
