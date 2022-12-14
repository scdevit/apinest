
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';  
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

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

  findOne(id: number): Promise<User> {
    return this.userRepo.findOneBy({ id });
  } 

  update(id: number, updateUserDto: UpdateUserDto) {
    updateUserDto.id = id
    return this.userRepo.save(updateUserDto);
  }
 

  async remove(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}