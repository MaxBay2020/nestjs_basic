import {
  Body,
  Controller,
  Get,
  Param, ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Req,
  Res, UseGuards,
  UsePipes,
  ValidationPipe
} from "@nestjs/common";
import { Request, Response } from "express"
import { CreateUserDto } from "../../dtos/CreateUser.dto";
import { UsersService } from "../../services/users/users.service";
import { ValidateCreateUserPipe } from "../../pipes/validate-create-user/validate-create-user.pipe";
import { AuthGuard } from "../../guards/auth-guard/auth-guard.guard";

// @Controller('users')中的users会作为route的一部分，如localhost:3000/users
@Controller('users')
// 如果想让guard应用于下面所有的controller；
// @UseGuards(AuthGuard)
export class UsersController {

  // 使用下面的方式来将userService注入到此controller中，之后就可以使用userService了
  constructor(private userService: UsersService){}

  @Get()
  // AuthGuard只应用于此controller；
  @UseGuards(AuthGuard)
  getUsers() {
    return this.userService.queryAllUsers()
  }

  @Get('/:userId')
  getUserById(@Param('userId') userId: string) {
    return this.userService.queryUserById(userId)
  }

  @Post()
  @UsePipes(ValidationPipe)
  // 下面代码的意思是：要将req中的body进行pipe处理；
  // 同理，如果想对param或query进行pipe处理，就是@Params(ValidateCreateUserPipe)或@Query(ValidateCreateUserPipe)
  createUser(@Body(ValidateCreateUserPipe) user: CreateUserDto) {
    console.log(user);
    return this.userService.createUser(user)
  }

  // 使用Get()方法标记一个方法是get请求；
  // 访问localhost:3000/users会进到此controller；
  // @Get()
  // getUsers() {
  //   return {
  //     message: 'query all users'
  //   }
  // }

  // @Get('posts')中的'posts'会追加route，如localhost:3000/users/posts才能访问此controller；
  // @Get('posts')
  // getPosts() {
  //   return {
  //     message: 'query all posts'
  //   }
  // }

  // 使用@Param()方法来获取动态params
  // @Get('/:userId')
  // getUserById(@Param('userId') userId: string) {
  //   return {
  //     message: `query user by userId: ${userId}`
  //   }
  // }

  // 使用@Param()方法来获取动态params
  // ParseIntPipe会将传来的userId参数转换成number
  // @Get('/:userId')
  // getUserById(@Param('userId', ParseIntPipe) userId: number) {
  //   return {
  //     message: `query user by userId: ${userId}`
  //   }
  // }

  // query参数
  // @Get()
  // getUsers(@Query('page') page: string, @Query('limit') limit: string, @Query('sortByDesc', ParseBoolPipe) sortDesc){
  //   return {
  //     message: `query user by page: ${page} and limit: ${limit}`
  //   }
  // }

  // @Post()
  // // 使用下面两种方式获取body
  // // 方式一：注意！Request和Response类型来自于express；
  // createUser(@Req() req: Request, @Res() res: Response) {
  //   console.log(req.body);
  //
  //   return res.send('create user')
  // }

  // 方式二（推荐）：使用@Body()来获取request body；
  // 注意！在设置body的类型的时候，我们可以使用DTO来规范其类型；并且使用class-validator class-transformer包来对前端传来的数据进行验证
  // @Post()
  // // 使用@UsePipes(new ValidationPipe())，来将下面的方法进行DTO验证；如果不加这行代码，则不会走验证流程；
  // @UsePipes(new ValidationPipe())
  // createUser(@Body() newUserData: CreateUserDto) {
  //   // 验证body
  //
  //   console.log(newUserData)
  //   return {
  //     message: 'create user'
  //   }
  //
  // }
}
