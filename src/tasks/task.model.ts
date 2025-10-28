import { IsNotEmpty } from 'class-validator';
export interface Tasks {
  id: string;
  name: string;
  description: string;
  status: taskStatus;
}

export enum taskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  DELETED = 'DELETED',
}
