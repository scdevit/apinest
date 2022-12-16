import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger/dist';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidUnknownValues: true,
    transform: true
  }))
  const configSwagger = new DocumentBuilder()
  .setTitle('Dokumentasi API MK')
  .setDescription('Dokumentasi untuk api MK')
  .setVersion('1.0')
  .addBearerAuth()
  .build()

  const configCustomSwagger : SwaggerCustomOptions = {
    swaggerOptions: { docExpansion: "none"}
  }

  const doc = SwaggerModule.createDocument(app,configSwagger)
  SwaggerModule.setup('doc',app,doc,configCustomSwagger)
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
