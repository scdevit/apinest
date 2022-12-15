import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service'; 
import { ApiBearerAuth } from '@nestjs/swagger'
import { JwtGuard } from './jwt/jwt.guard';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtGuard)
  cekUser(@Request() req){
    return req.user
  }

  @Post()
  async login(@Body() authDto : AuthDto){
    let user = await this.authService.cekUser(authDto.username,authDto.password)
    return this.authService.generateToken({id:user.id})
  }

}
