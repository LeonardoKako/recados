import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonsService } from 'src/persons/persons.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly personsService: PersonsService,
  ) {}

  async findAll() {
    const messages = await this.messageRepository.find({
      relations: ['de', 'para'],
      order: {
        id: 'desc',
      },
      select: {
        de: {
          id: true,
          name: true,
        },
        para: {
          id: true,
          name: true,
        },
      },
    });

    return messages;
  }

  async findOne(id: number) {
    // const message = this.messages.find((i) => i.id === +id);
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
      relations: ['de', 'para'],
      select: {
        de: {
          id: true,
          name: true,
        },
        para: {
          id: true,
          name: true,
        },
      },
    });

    // throw new HttpException('Recado não encontrado', 404);
    if (!message) throw new NotFoundException('Recado não encontrado');

    return message;
  }

  async create(createMessageDto: CreateMessageDto) {
    const { deId, paraId } = createMessageDto;

    const de = await this.personsService.findOne(deId);
    const para = await this.personsService.findOne(paraId);

    const newMessage = {
      texto: createMessageDto.texto,
      de,
      para,
      lido: false,
      data: new Date(),
    };

    const message = this.messageRepository.create(newMessage);
    await this.messageRepository.save(message);

    return {
      ...message,
      de: {
        id: message.de.id,
      },
      para: {
        id: message.para.id,
      },
    };
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const message = await this.findOne(id);

    message.texto = updateMessageDto?.texto ?? message.texto;
    message.lido = updateMessageDto?.lido ?? message.lido;

    await this.messageRepository.save(message);
    return message;
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id });

    if (message) return this.messageRepository.remove(message);

    throw new NotFoundException('Recado não encontrado');
  }
}
