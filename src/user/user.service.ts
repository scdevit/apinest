
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';  
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {
   constructor(
    @InjectRepository(User) private userRepo : Repository<User>
   ){}

  create(createUserDto: CreateUserDto) {
    return this.userRepo.save(createUserDto);
  }

  findAll(){
    return this.userRepo.find();
  }

  findUsername(username: any){
    return this.userRepo.findOne({ 
      where: { 
        username: username
      }  })
  }

  
   
  findOne(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  } 

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id
		 if(updateUserDto.password){
				updateUserDto.password = this.hash(updateUserDto.password)
		 }
    return this.userRepo.save(updateUserDto);
  } 

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  hash(plainPassword){
    const hash = bcrypt.hashSync(plainPassword,10)
    return hash
  }
  
  compare(plainPassword,hash){
    const valid = bcrypt.compareSync(plainPassword,hash)
    return valid
  }
}