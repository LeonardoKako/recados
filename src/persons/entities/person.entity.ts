import { IsEmail } from 'class-validator';
import { Message } from 'src/messages/entities/message.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Person {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 55 })
  passwordHash: string;

  @Column({ length: 100 })
  name: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Uma pessoa por ter enviado muitos recados (como "de")
  @OneToMany(() => Message, (message) => message.de)
  messagesSent: Message[];

  // Uma pessoa por ter recebido muitos recados (como "para")
  @OneToMany(() => Message, (message) => message.para)
  messagesReceived: Message[];
}
