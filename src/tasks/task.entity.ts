import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { taskStatus } from './task.model';
import { User } from 'src/auth/user.entity';

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

  @ManyToOne(() => User, (user) => user.tasks ,{ eager: false })
  user: User;
}
