import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { UpdateTaskStatusDto } from './dto/update-task-status-dto';
import { Task } from './task.entity';
import { TaskResponseDto } from './dto/task-response-dto';
import { ParseUUIDPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { getUser } from 'src/auth/get-user-decorator';
import { User } from 'src/auth/user.entity';
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get()
  getTasks(@getUser() user: User): Promise<TaskResponseDto[]> {
    console.log('user', user);
    return this.taskService.getTasks(user);
    
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @getUser() user: User,
  ): Promise<Task> {
    return this.taskService.createTask(createTaskDto, user);
  }

  @Get('/:id')
  findTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @getUser() user: User,
  ): Promise<Task> {
    return this.taskService.findTask(id, user);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @getUser() user: User,
  ): Promise<void> {
    return this.taskService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @getUser() user: User,
  ): Promise<Task> {
    return this.taskService.updateTask(id, updateTaskStatusDto.status, user);
  }
}
