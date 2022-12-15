import { ApiProperty } from "@nestjs/swagger/dist/decorators"
import { IsOptional, IsString, IsEmail, MinLength, MaxLength } from "class-validator"
 
export class CreateUserDto {
    @ApiProperty()
    @IsOptional()
    id?: number

    @ApiProperty()
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    username : string 

    @ApiProperty()
    @IsString()
    @MinLength(8)
    @MaxLength(32)
    password : string

    @ApiProperty()
    @IsEmail()
    email : string 

    @ApiProperty()
    @IsString()
    @MaxLength(200)
    nama_user : string
}