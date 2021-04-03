import { Db } from 'mongodb'
import { nanoid } from 'nanoid'

export const createCourse = async (db: Db, course: { createdBy: string; name: string }) => {
  return db
    .collection('courses')
    .insertOne({
      _id: nanoid(12),
      ...course,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])
}

// todo: orgId
export const getCourses = async (db: Db) => {
  return db.collection('courses').find().toArray()
}
