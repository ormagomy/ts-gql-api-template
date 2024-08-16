import { ApolloServer } from '@apollo/server'
import { gql } from 'graphql-tag'
import mongoose from 'mongoose'

import { TodoMongooseModel } from '@src/modules/todo/model'
import { buildSchema } from '@src/utils/schema'

import { clearDatabase, closeDatabase, connect, populateDatabase } from '@tests/utils'

beforeAll(async () => connect())

// You can populate de DB before each test
beforeEach(async () => {
  await populateDatabase(TodoMongooseModel, [
    {
      content: 'todo 1',
      isDone: false,
    },
    {
      content: 'todo 2',
      isDone: true,
    },
  ])
})

afterEach(async () => {
  await clearDatabase()
})

afterAll(async () => {
  await closeDatabase()
})

describe('Todo', () => {
  it(`should create a todo`, async () => {
    const graphQLSchema = buildSchema()

    const server = new ApolloServer({
      schema: graphQLSchema,
    })

    // Define the query and the variables as you would do from your front-end
    const variables = {
      createTodoInput: {
        content: `Test todo.`,
      },
    }

    const CREATE_TODO = gql`
      mutation createTodo($createTodoInput: CreateTodoInput!) {
        createTodo(createTodoInput: $createTodoInput) {
          content
        }
      }
    `

    // Run query against the server and snapshot the output
    const res = await server.executeOperation({
      query: CREATE_TODO,
      variables,
    })

    expect(res).toMatchSnapshot()
  })

  it(`should get a todo`, async () => {
    const todoId = new mongoose.Types.ObjectId().toHexString().toString()

    // Add a todo with the pre-generated ID in the database
    await populateDatabase(TodoMongooseModel, [
      {
        _id: todoId,
        content: 'todo 1',
        isDone: false,
      },
    ])

    const graphQLSchema = buildSchema()

    const server = new ApolloServer({
      schema: graphQLSchema,
    })

    const variables = {
      id: todoId,
    }

    const GET_TODO = gql`
      query todo($id: ObjectId!) {
        todo(id: $id) {
          content
        }
      }
    `

    const res = await server.executeOperation({
      query: GET_TODO,
      variables,
    })

    expect(res).toMatchSnapshot()
  })

  it(`should get all todos`, async () => {
    const graphQLSchema = buildSchema()

    const server = new ApolloServer({
      schema: graphQLSchema,
    })

    const GET_ALL_TODOS = gql`
      query getAllTodos {
        todos {
          content
          isDone
        }
      }
    `

    const res = await server.executeOperation({
      query: GET_ALL_TODOS,
    })

    expect(res).toMatchSnapshot()
  })

  it(`should update a todo`, async () => {
    const todoId = new mongoose.Types.ObjectId().toHexString().toString()

    // Add a todo with the pre-generated ID in the database
    await populateDatabase(TodoMongooseModel, [
      {
        _id: todoId,
        content: 'todo 1',
        isDone: false,
      },
    ])

    const graphQLSchema = buildSchema()

    const server = new ApolloServer({
      schema: graphQLSchema,
    })

    const variables = {
      updateTodoInput: {
        _id: todoId,
        content: 'Updated todo',
        isDone: true,
      },
    }

    const UPDATE_TODO = gql`
      mutation updateTodo($updateTodoInput: UpdateTodoInput!) {
        updateTodo(updateTodoInput: $updateTodoInput) {
          content
          isDone
        }
      }
    `

    const res = await server.executeOperation({
      query: UPDATE_TODO,
      variables,
    })

    expect(res).toMatchSnapshot()
  })

  it(`should return an error when updating a todo with a non-existent _id`, async () => {
    const missingId = new mongoose.Types.ObjectId().toHexString().toString()

    const graphQLSchema = buildSchema()

    const server = new ApolloServer({
      schema: graphQLSchema,
    })

    const variables = {
      updateTodoInput: {
        _id: missingId,
        content: 'Updated todo',
      },
    }

    const UPDATE_TODO = gql`
      mutation updateTodo($updateTodoInput: UpdateTodoInput!) {
        updateTodo(updateTodoInput: $updateTodoInput) {
          content
          isDone
        }
      }
    `

    const res = await server.executeOperation({
      query: UPDATE_TODO,
      variables,
    })

    expect(res).toMatchSnapshot()
  })
})
