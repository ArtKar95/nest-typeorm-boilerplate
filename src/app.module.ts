import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BootstrapTypeormModule } from '@app/bootstrap/typeorm.module';
import { BootstrapConfigModule } from '@app/bootstrap/config.module';
import { AuthUserMiddleware } from '@app/common/middlewares/auth-user.middleware';

@Module({
  imports: [BootstrapConfigModule, BootstrapTypeormModule],
  providers: [ConfigService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    return consumer.apply(AuthUserMiddleware).forRoutes('*');
  }
}
