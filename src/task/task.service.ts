import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  async createTask(title: string, description: string, dueDate: Date): Promise<Task> {
    const task = new Task();
    task.title = title;
    task.description = description;
    task.dueDate = dueDate;
    return this.taskRepository.save(task);
  }

  async getTasks(): Promise<Task[]> {
    return this.taskRepository.find();
  }

  async updateTask(id: string, status: string): Promise<Task> {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new Error('Task not found');
    }
    task.status = status;
    return this.taskRepository.save(task);
  }

  async deleteTask(id: string): Promise<void> {
    await this.taskRepository.delete(id);
  }
}