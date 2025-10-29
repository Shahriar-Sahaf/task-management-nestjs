import { Injectable, NotFoundException } from '@nestjs/common';
import { taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  async getTasks(): Promise<Task[]> {
    return this.tasksRepository.findAll();
  }

  async createTask(taskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(taskDto);
  }

  async findTask(id: string): Promise<Task> {
    const task = await this.tasksRepository.findById(id);
    if (!task) {
      throw new NotFoundException('There Is No Task With This id');
    }
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    const affected = await this.tasksRepository.deleteById(id);
    if (affected === 0) {
      throw new NotFoundException('There Is No Task With This id');
    }
  }

  async updateTask(id: string, status: taskStatus): Promise<Task> {
    const task = await this.findTask(id);
    task.status = status;
    return this.tasksRepository.save(task);
  }
}
