import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FileUploadService {
    constructor(private readonly clodinaryService: CloudinaryService){}

    async uploadFile(file: UploadFileDto){
        return this.clodinaryService.uploadFile(file.buffer, file.originalname)
    }
}
