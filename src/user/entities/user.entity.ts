
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User  {
    [x: string]: any;
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username : string

    @Column()
    password : string

    @Column()
    email : string

    @Column()
    nama_user : string 

    @CreateDateColumn()
    create_at : Date

    @UpdateDateColumn()
    update_at : Date
}

 