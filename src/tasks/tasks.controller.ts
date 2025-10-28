import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Tasks, taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Tasks[] {
    return this.taskService.getTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Tasks {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  findTask(@Param('id') id: string): Tasks {
    return this.taskService.findTask(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Tasks {
    return this.taskService.updateTask(id, updateTaskStatusDto.status);
  }
}
