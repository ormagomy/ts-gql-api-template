import { ObjectId } from 'mongodb'

export type partialWithId<T> = Partial<T> & { _id: ObjectId }
export type partialOf<T, K extends keyof T> = Partial<T> & Pick<T, K>
