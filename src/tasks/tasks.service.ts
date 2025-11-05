import { Injectable, NotFoundException } from '@nestjs/common';
import { taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { User } from 'src/auth/user.entity';
import { TaskResponseDto } from './dto/task-response-dto';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTasks(user: User): Promise<TaskResponseDto[]> {
    const tasks = await this.tasksRepository.findAll(user);
    return tasks.map((t) => ({
      id: t.id,
      name: t.name,
      description: t.description,
      status: t.status,
      userId: t.user?.id ?? user.id,
    }));
  }

  async createTask(taskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(taskDto, user);
  }

  async findTask(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findById(id, user);
    if (!task) {
      throw new NotFoundException('There Is No Task With This id');
    }
    return task;
  }

  async deleteTask(id: string, user: User): Promise<void> {
    const affected = await this.tasksRepository.deleteById(id, user);
    if (affected === 0) {
      throw new NotFoundException('There Is No Task With This id');
    }
  }

  async updateTask(id: string, status: taskStatus, user: User): Promise<Task> {
    const task = await this.findTask(id, user);
    task.status = status;
    return this.tasksRepository.save(task);
  }
}
