import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ValidateCreateUserPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value)

    const parseAgeToString = value.age.toString()
    console.log(parseAgeToString);
    if(!parseAgeToString){
      // 如果需要返回错误信息，只需要这么写即可，nestjs自带一层处理逻辑帮我们处理；
      throw new HttpException('invalid type for age', HttpStatus.BAD_REQUEST)
    }else{
      return {
        ...value,
        age: parseAgeToString
      }
    }
  }
}
