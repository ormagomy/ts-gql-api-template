import { MaxLength, MinLength, NotEquals } from 'class-validator'
import { Field, InputType, ObjectType } from 'type-graphql'

import { withId } from '@src/utils/mixins/with.id'
import { withTimestamps } from '@src/utils/mixins/with.timestamps'

@ObjectType()
@InputType()
class TodoBase {
  @Field({ nullable: true })
  @MaxLength(300)
  @MinLength(1)
  content?: string

  @Field({ nullable: true })
  @NotEquals(null)
  isDone?: boolean
}

@ObjectType()
export class Todo extends withTimestamps(withId(TodoBase)) {
  @Field()
  content: string

  @Field()
  isDone: boolean
}

@InputType()
export class CreateTodoInput extends TodoBase {
  @Field()
  content: string
}

@InputType()
export class UpdateTodoInput extends withId(TodoBase) {}
