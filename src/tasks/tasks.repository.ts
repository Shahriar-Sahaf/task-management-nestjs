import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { taskStatus } from './task.model';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return this.repository.find();
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const task = this.repository.create({
      name: dto.name,
      description: dto.description,
      status: taskStatus.OPEN,
    });
    return this.repository.save(task);
  }

  async findById(id: string): Promise<Task | null> {
    return this.repository.findOne({ where: { id } });
  }

  async deleteById(id: string): Promise<number> {
    const result = await this.repository.delete({ id });
    return result.affected ?? 0;
  }

  async save(task: Task): Promise<Task> {
    return this.repository.save(task);
  }
}
