import { RequestHandler } from 'express'
import { userService } from './user.services'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    // console.log(user)
    const result = await userService.createUserService(user)
    // console.log('result', result)
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const userController = {
  createUser,
}
