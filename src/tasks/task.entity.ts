import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { taskStatus } from './task.model';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: taskStatus, default: taskStatus.OPEN })
  status: taskStatus;
}
