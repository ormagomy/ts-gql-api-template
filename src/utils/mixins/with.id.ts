import { ObjectId } from 'mongodb'
import { type ClassType, Field, InputType, ObjectType } from 'type-graphql'

/**
 * Adds 'id' property to the base, extended class
 */
export function withId<TClassType extends ClassType>(BaseClass: TClassType) {
  @ObjectType()
  @InputType()
  class IDTrait extends BaseClass {
    @Field()
    readonly _id!: ObjectId
  }

  return IDTrait
}
