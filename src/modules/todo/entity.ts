import { modelOptions, prop } from '@typegoose/typegoose'

import { withId } from '@src/utils/mixins/with.id'
import { withTimestamps } from '@src/utils/mixins/with.timestamps'
import { partialOf, partialWithId } from '@src/utils/typeHelpers'

export class TodoBase {
  @prop()
  content: string

  @prop({ default: false })
  isDone: boolean
}

@modelOptions({
  schemaOptions: {
    collection: 'todos',
    timestamps: true,
  },
})
export class Todo extends withTimestamps(withId(TodoBase)) {}

export type CreateTodoType = partialOf<TodoBase, 'content'>
export type UpdateTodoType = partialWithId<Todo>
