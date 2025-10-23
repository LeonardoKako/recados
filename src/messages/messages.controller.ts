import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get()
  findAll(@Query() pagination: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { limit = 10, offset = 0 } = pagination;
    return `Retorna todos os recados. Limit=${limit}, Offset=${offset}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Post()
  create(@Body() body: any): any {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any): any {
    return {
      id,
      ...body,
    };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `cabra com o id:${id} foi deletado`;
  }
}
