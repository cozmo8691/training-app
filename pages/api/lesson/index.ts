import { NextApiResponse } from 'next'
import nc from 'next-connect'
import { lesson } from '../../../db'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { Request } from '../../../types'

const handler = nc<Request, NextApiResponse>({
  onError,
})

handler.use(middleware)
handler.post(async (req, res) => {
  const newLesson = await lesson.createLesson(req.db, {
    createdBy: req.user.id,
    name: req.body.name,
    course: req.body.course,
  })
  res.send({ data: newLesson })
})

export default handler
