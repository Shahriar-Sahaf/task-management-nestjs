import { IsEnum, IsNotEmpty } from 'class-validator';
import { taskStatus } from '../task.model';

export class UpdateTaskStatusDto {
  @IsNotEmpty()
  @IsEnum(taskStatus)
  status: taskStatus;
}
