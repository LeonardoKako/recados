import { Person } from 'src/persons/entities/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  texto: string;

  @Column({ default: false })
  lido: boolean;

  @Column()
  data: Date; //createAt

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  // Muitos recados podem ser enviados por uma unica pessoa(emissor)
  @ManyToOne(() => Person)
  //Especifica a coluna 'de' que armazena o Id da pessoa que enviou o recado
  @JoinColumn({ name: 'de' })
  de: Person;

  // Muitos recados podem ser enviados para uma unica pessoa(destinatário)
  @ManyToOne(() => Person)
  //Especifica a coluna 'para' que armazena o Id da pessoa que enviou o recado
  @JoinColumn({ name: 'para' })
  para: string;
}
