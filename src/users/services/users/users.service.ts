import { Injectable } from '@nestjs/common';
import { CreateUserDto } from "../../dtos/CreateUser.dto";

@Injectable()
export class UsersService {
  // 查询所有user
  queryAllUsers(){
    return {
      message: 'query all users'
    }
  }

  // 根据userId查询user
  queryUserById(userId: string){
    return {
      message: `query user by userId: ${userId}`
    }
  }
  // 创建user
  createUser(user: CreateUserDto){
    return {
      message: 'create user'
    }
  }
}
