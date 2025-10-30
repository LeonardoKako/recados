import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from './entities/person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonsService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  async create(createPersonDto: CreatePersonDto) {
    try {
      const personData = {
        name: createPersonDto.name,
        passwordHash: createPersonDto.password,
        email: createPersonDto.email,
      };

      const newPerson = this.personRepository.create(personData);
      await this.personRepository.save(newPerson);
      return newPerson;
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (error.code === '23505') {
        throw new ConflictException('E-mail já cadastrado');
      }

      throw error;
    }
  }

  async findAll() {
    return await this.personRepository.find({ order: { id: 'desc' } });
  }

  findOne(id: number) {
    return `This action returns a #${id} person`;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto) {
    const personData = {
      name: updatePersonDto?.name,
      passwordHash: updatePersonDto?.password,
    };
    const person = await this.personRepository.preload({
      id,
      ...personData,
    });

    if (!person) throw new NotFoundException('Pessoa não encontrada');

    return this.personRepository.save(person);
  }

  async remove(id: number) {
    const person = await this.personRepository.findOneBy({ id });
    if (!person) throw new NotFoundException('Pessoa não encontrada');

    return this.personRepository.remove(person);
  }
}
