/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Message } from './entities/message.entity';

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

  findAll(pagination: { limit: number; offset: number }) {
    const { limit = 10, offset = 0 } = pagination;
    return this.messages;
    // return `Retorna todos os recados. Limit=${limit}, Offset=${offset}`;
  }

  findOne(id: string) {
    const message = this.messages.find((i) => i.id === +id);

    if (message) return message;

    // throw new HttpException('Recado não encontrado', 404);
    throw new NotFoundException('Recado não encontrado');
  }

  create(body: any) {
    this.lastId++;
    const id = this.lastId;
    const newMessage = {
      id,
      ...body,
    };

    this.messages.push(newMessage);

    return newMessage;
  }

  update(id: string, body: any) {
    const messageExistsIndex = this.messages.findIndex((i) => i.id === +id);

    if (messageExistsIndex < 0) {
      throw new NotFoundException('Recado não encontrado');
    }

    const messageExists = this.messages[messageExistsIndex];
    this.messages[messageExistsIndex] = {
      ...messageExists,
      ...body,
    };

    return this.messages[messageExistsIndex];
  }

  remove(id: string) {
    const messageExistsIndex = this.messages.findIndex((i) => i.id === +id);

    if (messageExistsIndex < 0) {
      throw new NotFoundException('Recado não encontrado');
    }

    const message = this.messages[messageExistsIndex];

    this.messages.splice(messageExistsIndex, 1);

    return message;
  }
}
