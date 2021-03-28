import { Db } from 'mongodb'
import { nanoid } from 'nanoid'

export const getOneScreen = async (db: Db, id: string) => {
  return db.collection('screens').findOne({ _id: id })
}

export const getScreensByLesson = async (db: Db, lessonId: string) => {
  return db.collection('screens').find({ lesson: lessonId }).toArray()
}

export const createScreen = async (
  db: Db,
  screen: { createdBy: string; lesson: string; name: string; content?: any },
) => {
  return db
    .collection('screens')
    .insertOne({
      _id: nanoid(12),
      ...screen,
      createdAt: new Date().toDateString(),
    })
    .then(({ ops }) => ops[0])
}

export const updateOne = async (db: Db, id: string, updates: any) => {
  const operation = await db.collection('screens').updateOne(
    {
      _id: id,
    },
    { $set: updates },
  )

  if (!operation.result.ok) {
    throw new Error('Could not update screen')
  }

  const updated = await db.collection('screens').findOne({ _id: id })
  return updated
}
