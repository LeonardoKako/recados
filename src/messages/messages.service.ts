import { Injectable } from '@nestjs/common';

@Injectable()
export class MessagesService {
  findAll() {
    return 'Rota retorna todos';
  }

  findOne(id: string) {
    return `Retorna ${id}`;
  }
}
