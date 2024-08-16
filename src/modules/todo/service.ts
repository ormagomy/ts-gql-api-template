import { ObjectId } from 'mongodb'
import { Service } from 'typedi'

import { CreateTodoType, Todo, UpdateTodoType } from '@src/modules/todo/entity'
import TodoModel from './model'

@Service()
export default class TodoService {
  constructor(private readonly todoModel: TodoModel) {}

  public async getById(_id: ObjectId): Promise<Todo | null> {
    return this.todoModel.getById(_id)
  }

  public async getAll(): Promise<Todo[]> {
    return this.todoModel.getAll()
  }

  public async addTodo(data: CreateTodoType): Promise<Todo> {
    const newTodo = await this.todoModel.create(data)

    // Business logic goes here
    // Example: Trigger push notification, analytics, ...

    return newTodo
  }

  public async updateTodo(data: UpdateTodoType): Promise<Todo> {
    const newTodo = await this.todoModel.update(data)

    // Business logic goes here
    // Example: Trigger push notification, analytics, ...

    return newTodo
  }
}
