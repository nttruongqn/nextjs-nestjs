import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { appConfig } from '@utils/configs';
import * as bodyParser from 'body-parser';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { loggerHelper } from '@utils/helpers';
import { AppModule } from '@modules/index';


async function bootstrap() {
  try {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, appConfig.APP.OPTIONS);
    app.use(bodyParser.json({ limit: '100mb' }));
    app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
    app.setGlobalPrefix('api');

    const options = new DocumentBuilder()
      .setTitle('API')
      .setDescription('Swagger Docs for API')
      .setVersion('1.0')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'Admin' }, 'Admin')
      .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT', name: 'User' }, 'User')
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('swagger', app, document);
    loggerHelper.verbose('Setup Swagger success');
    await app.listen(appConfig.APP.PORT);
    loggerHelper.verbose(`API connect at http://localhost:${appConfig.APP.PORT}`);

  } catch (err) {
    if (err instanceof Error) {
      loggerHelper.error('BOOT_APP_ERROR', err);
    }
  }
  // await app.listen(3001);
}
bootstrap();
