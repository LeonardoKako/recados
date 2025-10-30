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
    const messages = await this.messageRepository.find();
    return messages;
  }

  async findOne(id: number) {
    // const message = this.messages.find((i) => i.id === +id);
    const message = await this.messageRepository.findOne({
      where: {
        id,
      },
    });

    if (message) return message;

    // throw new HttpException('Recado não encontrado', 404);
    throw new NotFoundException('Recado não encontrado');
  }

  async create(createMessageDto: CreateMessageDto) {
    const { deId, paraId } = createMessageDto;

    const de = await this.personsService.findOne(deId);
    const para = await this.personsService.findOne(paraId);

    const newMessage = {
      ...createMessageDto,
      lido: false,
      data: new Date(),
    };

    const message = this.messageRepository.create(newMessage);

    return this.messageRepository.save(message);
  }

  async update(id: number, updateMessageDto: UpdateMessageDto) {
    const partialUpdateMessageDto = {
      lido: updateMessageDto?.lido,
      texto: updateMessageDto?.texto,
    };
    const message = await this.messageRepository.preload({
      id,
      ...partialUpdateMessageDto,
    });

    if (message) return this.messageRepository.save(message);

    throw new NotFoundException('Recado não encontrado');
  }

  async remove(id: number) {
    const message = await this.messageRepository.findOneBy({ id });

    if (message) return this.messageRepository.remove(message);

    throw new NotFoundException('Recado não encontrado');
  }
}
