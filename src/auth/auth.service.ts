import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
 
@Injectable()
export class AuthService {
  constructor(
    private userService : UserService,
    private jwtService : JwtService
  ){
    
  }
  async cekUser(username,password){
    let user = await this.userService.findUsername(username)
    if(user){
        const valid = this.userService.compare(password,user.password)
        if(valid){
          return user
        }else{
          throw new BadRequestException({message:'password ente salah'})
        }
    }else{
       throw new BadRequestException({message: 'username ente ga ada'})
    }
  }

  generateToken(user:any){
    let dataToken = {id:user.id}
    let token = this.jwtService.sign(dataToken)
    return {token:token}
  }

}
