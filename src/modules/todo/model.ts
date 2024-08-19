import { getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { Service } from 'typedi'

import { CreateTodoType, Todo, UpdateTodoType } from '@src/modules/todo/entity'
import { NotFoundError } from '@src/utils/errors'

export const TodoMongooseModel = getModelForClass(Todo)

@Service()
export default class TodoModel {
  async getById(_id: ObjectId): Promise<Todo | null> {
    return TodoMongooseModel.findById(_id).lean().exec()
  }

  async getAll(): Promise<Todo[]> {
    return TodoMongooseModel.find().lean().exec()
  }

  async create(data: CreateTodoType): Promise<Todo> {
    return TodoMongooseModel.create(data)
  }

  async update({ _id, ...data }: UpdateTodoType): Promise<Todo> {
    const todo = await TodoMongooseModel.findById({ _id })

    if (!todo) {
      throw new NotFoundError()
    }

    todo.set(data)
    return todo.save()
  }
}
