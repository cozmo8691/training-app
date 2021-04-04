import { Db } from 'mongodb'

export const getAdmin = async (db: Db, id: string) => {
  return db
    .collection('admins')
    .find({
      adminId: id,
    })
    .toArray()
}
