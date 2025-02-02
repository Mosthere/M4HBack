import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBody, ApiConsumes } from "@nestjs/swagger";

@Controller('files')
export class FileUploadController {
  constructor(
    private readonly fileUploadService: FileUploadService
  ){}

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { type: 'string', format: 'binary', description: 'Imagen del producto' },
      },
    },
  })
  @Post('uploadImage/:productId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadProductImage(
    @Param('productId', ParseUUIDPipe) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators:[
          new MaxFileSizeValidator({
            maxSize: 204800,
            message: 'El tamaño del archivo no puede ser mayor a 200kb'
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          })
        ]
      })
    ) file: Express.Multer.File
  ){
    return this.fileUploadService.uploadProductImage(file, productId)
  }
  
}
