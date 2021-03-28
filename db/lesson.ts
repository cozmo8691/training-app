import { Db } from 'mongodb'
import { nanoid } from 'nanoid'

export const createLesson = async (db: Db, lesson: { createdBy: string; name: string }) => {
  return db
    .collection('lessons')
    .insertOne({
      _id: nanoid(12),
      ...lesson,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])
}

// todo: orgId
export const getLessons = async (db: Db, userId: string) => {
  return db
    .collection('lessons')
    .find({
      createdBy: userId,
    })
    .toArray()
}
