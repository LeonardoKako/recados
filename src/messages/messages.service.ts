import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  findAll(pagination: { limit: number; offset: number }) {
    const { limit = 10, offset = 0 } = pagination;
    return `Retorna todos os recados. Limit=${limit}, Offset=${offset}`;
  }

  findOne(id: string) {
    return `Retorna ${id}`;
  }

  create(body: any): any {
    return body;
  }

  update(id: string, body: any): any {
    return {
      id,
      ...body,
    };
  }

  remove(id: string) {
    return `cabra com o id:${id} foi deletado`;
  }
}
