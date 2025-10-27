import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  private lastId = 1;
  private messages: Message[] = [
    {
      id: 1,
      texto: 'Este é um recado de teste',
      de: 'Leonardo',
      para: 'João',
      lido: false,
      data: new Date(),
    },
  ];

  findAll() {
    return this.messages;
  }

  findOne(id: number) {
    const message = this.messages.find((i) => i.id === +id);

    if (message) return message;

    // throw new HttpException('Recado não encontrado', 404);
    throw new NotFoundException('Recado não encontrado');
  }

  create(createMessageDto: CreateMessageDto) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...createMessageDto,
      lido: false,
      data: new Date(),
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: number, updateMessageDto: UpdateMessageDto) {
    const messageExistsIndex = this.messages.findIndex((i) => i.id === +id);

    if (messageExistsIndex < 0) {
      throw new NotFoundException('Recado não encontrado');
    }

    const messageExists = this.messages[messageExistsIndex];
    this.messages[messageExistsIndex] = {
      ...messageExists,
      ...updateMessageDto,
    };

    return this.messages[messageExistsIndex];
  }

  remove(id: number) {
    const messageExistsIndex = this.messages.findIndex((i) => i.id === +id);

    if (messageExistsIndex < 0) {
      throw new NotFoundException('Recado não encontrado');
    }

    const message = this.messages[messageExistsIndex];

    this.messages.splice(messageExistsIndex, 1);

    return message;
  }
}
