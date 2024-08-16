import { ObjectId } from 'mongodb'
import { buildSchemaSync } from 'type-graphql'
import Container from 'typedi'

import { resolvers } from '@src/api/gql'
import { ObjectIdScalar } from '@src/utils/scalars'

// Here goes your schema building bit, doing it this way allows us to use it in the tests as well!
export const buildSchema = () =>
  buildSchemaSync({
    resolvers,
    container: Container,
    scalarsMap: [{ type: ObjectId, scalar: ObjectIdScalar }],
    validate: {
      skipMissingProperties: false,
      skipUndefinedProperties: true,
      skipNullProperties: false,
    },
    emitSchemaFile: true,
  })
