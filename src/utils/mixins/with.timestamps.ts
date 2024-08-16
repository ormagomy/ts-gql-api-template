import { type ClassType, Field, ObjectType } from 'type-graphql'

/**
 * Adds timestamp properties to the base, extended class
 */
export function withTimestamps<TClassType extends ClassType>(BaseClass: TClassType) {
  @ObjectType()
  class TimestampsTrait extends BaseClass {
    @Field()
    createdAt!: Date

    @Field()
    updatedAt!: Date
  }

  return TimestampsTrait
}
