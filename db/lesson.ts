import { Db } from 'mongodb'
import { nanoid } from 'nanoid'

export const createLesson = async (db: Db, lesson: { createdBy: string; name: string; course: string }) => {
  return db
    .collection('lessons')
    .insertOne({
      _id: nanoid(12),
      ...lesson,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])
}

export const getLessons = async (db: Db, courseId: string) => {
  return db
    .collection('lessons')
    .find({
      course: courseId,
    })
    .toArray()
}

export const getLessonById = async (db: Db, lessonId: string) => {
  return db
    .collection('lessons')
    .find({
      _id: lessonId,
    })
    .toArray()
}
