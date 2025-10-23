import { Injectable } from '@nestjs/common';
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
    return this.messages.find((i) => i.id === +id);
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

    if (messageExistsIndex >= 0) {
      const messageExists = this.messages[messageExistsIndex];
      this.messages[messageExistsIndex] = {
        ...messageExists,
        ...body,
      };
    }
  }

  remove(id: string) {
    const messageExists = this.messages.findIndex((i) => i.id === +id);

    if (messageExists >= 0) {
      this.messages.splice(messageExists, 1);
    }
  }
}
