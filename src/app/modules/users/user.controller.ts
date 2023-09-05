import { Request, Response } from 'express'
import userServices from './user.services'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userServices.createUserService(user)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    res.status(401).send({
      success: false,
      message: 'Failed to create ',
    })
  }
}

export default {
  createUser,
}
