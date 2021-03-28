import { NextApiResponse } from 'next'
import nc from 'next-connect'
import { course } from '../../../db'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { Request } from '../../../types'

const handler = nc<Request, NextApiResponse>({
  onError,
})

handler.use(middleware)
handler.post(async (req, res) => {
  const newCourse = await course.createCourse(req.db, { createdBy: req.user.id, name: req.body.name })
  res.send({ data: newCourse })
})

export default handler
