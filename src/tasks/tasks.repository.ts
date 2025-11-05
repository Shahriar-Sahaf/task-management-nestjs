import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task-dto';
import { taskStatus } from './task.model';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async findAll(user: User): Promise<Task[]> {
    return this.repository.find({ where: { user: { id: user.id } }, relations: ['user'] });
  }

  async createTask(dto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.repository.create({
      name: dto.name,
      description: dto.description,
      status: taskStatus.OPEN,
      user: user,
    });
    return this.repository.save(task);
  }

  async findById(id: string, user: User): Promise<Task | null> {
    return this.repository.findOne({ where: { id, user: { id: user.id } } });
  }

  async deleteById(id: string, user: User): Promise<number> {
    const result = await this.repository.delete({ id, user: { id: user.id } as any });
    return result.affected ?? 0;
  }

  async save(task: Task): Promise<Task> {
    return this.repository.save(task);
  }
}
