import { NextApiResponse } from 'next'
import nc from 'next-connect'
import { screen } from '../../../db'
import middleware from '../../../middleware/all'
import onError from '../../../middleware/error'
import { Request } from '../../../types'

const handler = nc<Request, NextApiResponse>({
  onError,
})

handler.use(middleware)
handler.post(async (req, res) => {
  const newScreen = await screen.createScreen(req.db, {
    createdBy: req.user.id,
    lesson: req.body.lesson,
    name: req.body.name,
  })
  res.send({ data: newScreen })
})

export default handler
