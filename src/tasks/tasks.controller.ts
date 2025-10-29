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
import { taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task.entity';
import { ParseUUIDPipe } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(): Promise<Task[]> {
    return this.taskService.getTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  findTask(@Param('id', new ParseUUIDPipe()) id: string): Promise<Task> {
    return this.taskService.findTask(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    return this.taskService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskStatusDto.status);
  }
}
