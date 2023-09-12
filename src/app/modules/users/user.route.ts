import express from 'express'
import { userController } from './user.controller'
// import { userValidation } from './user.validation'
// import validateRequest from '../../middlewares/validateRequest'

const router = express.Router()

router.post(
  '/create-user',
  // validateRequest(userValidation.createUserZodSchema),
  userController.createUser,
)

export default router
