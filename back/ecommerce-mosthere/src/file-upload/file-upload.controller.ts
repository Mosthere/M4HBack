import { Controller, FileTypeValidator, MaxFileSizeValidator, Param, ParseFilePipe, ParseUUIDPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileUploadService } from "./file-upload.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation } from "@nestjs/swagger";
import { Roles } from "src/decorators/role.decorators";
import { Role } from "src/users/enum/role.enum";
import { AuthGuard } from "src/guards/auth/auth.guard";
import { RolesGuard } from "src/guards/roles/roles.guard";

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
  @Roles(Role.Admin)
  @ApiBearerAuth()
  @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({
      summary: 'Upload a file image for products',
    })
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
