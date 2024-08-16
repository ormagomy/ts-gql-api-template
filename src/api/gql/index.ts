import TodoResolver from './todo/resolver'

// Important: Add all your module's resolver here
// eslint-disable-next-line @typescript-eslint/ban-types
export const resolvers: [Function, ...Function[]] = [
  TodoResolver,
  // UserResolver
  // AuthResolver
  // ...
]
