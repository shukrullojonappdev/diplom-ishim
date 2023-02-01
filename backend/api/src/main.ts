import { NestFactory } from '@nestjs/core'
import { NestExpressApplication } from '@nestjs/platform-express'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

const PORT = process.env.PORT as any | 3001

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.setGlobalPrefix('api')
  app.enableCors()

  const swaggerConfig = new DocumentBuilder().addBearerAuth().build()
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerConfig)
  SwaggerModule.setup('/api/doc', app, swaggerDoc)

  await app.listen(PORT)
}
bootstrap()
