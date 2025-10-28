import { Injectable, NotFoundException } from '@nestjs/common';
import { Tasks, taskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task-dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class TasksService {
  private tasks: Tasks[] = [];

  getTasks(): Tasks[] {
    return this.tasks;
  }

  createTask(taskDto: CreateTaskDto): Tasks {
    const task: Tasks = {
      id: uuid(),
      name: taskDto.name,
      description: taskDto.description,
      status: taskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  findTask(id: string): Tasks {
    const tsk = this.tasks.find((tasks) => tasks.id === id);

    if (!tsk) {
      throw new NotFoundException('There Is No Task With This id');
    }
    return tsk;
  }

  deleteTask(id: string): void {
    this.findTask(id);
    this.tasks = this.tasks.filter((tasks) => tasks.id != id);
  }

  updateTask(id: string, status: taskStatus): Tasks {
    const tsk = this.findTask(id);
    if (!tsk) {
      throw new NotFoundException('There Is No Task');
    }

    tsk.status = status;
    return tsk;
  }
}
