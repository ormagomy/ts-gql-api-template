import { ObjectId } from 'mongodb'
import { Arg, ArgsType, Field, Int, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'

import { CreateTodoInput, Todo, UpdateTodoInput } from './types'
import TodoService from '@src/modules/todo/service'

// TODO: think about pagination
@ArgsType()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class GetAllArgs {
  @Field(() => Int, { nullable: true })
  skip?: number

  @Field(() => Int, { nullable: true })
  take?: number
}

@Service()
@Resolver(Todo)
export default class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @Query(() => Todo)
  async todo(@Arg('id') id: ObjectId) {
    const todo = await this.todoService.getById(id)
    return todo
  }

  @Query(() => [Todo])
  async todos() {
    const todos = await this.todoService.getAll()
    return todos
  }

  @Mutation(() => Todo)
  async createTodo(@Arg('createTodoInput') createTodoInput: CreateTodoInput): Promise<Todo> {
    const todo = await this.todoService.addTodo(createTodoInput)
    return todo
  }

  @Mutation(() => Todo)
  async updateTodo(@Arg('updateTodoInput') updateTodoInput: UpdateTodoInput): Promise<Todo> {
    const todo = await this.todoService.updateTodo(updateTodoInput)
    return todo
  }
}
