import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { AuthMiddleware } from "./middlewares/auth/auth.middleware";
import { Auth2Middleware } from "./middlewares/auth2/auth2.middleware";

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
// 使用下面的方式来配置middleware
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    //  此middleware应用于UsersController中的所有controller；
    consumer.apply(AuthMiddleware).forRoutes(UsersController)
    // 使用多个middleware
    consumer.apply(AuthMiddleware).forRoutes(UsersController).apply(Auth2Middleware).forRoutes(UsersController)
    // 此middleware应用于users route和users/:userid route中的GET请求；
    consumer.apply(AuthMiddleware).forRoutes(
      {
        path: 'users',
        method: RequestMethod.GET
      },
      {
        path: 'users/:userId',
        method: RequestMethod.GET
      }
      )
  }
}
