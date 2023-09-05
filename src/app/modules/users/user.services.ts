import config from '../../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { generateUserIncrementalId } from './user.utils'

const createUserService = async (user: IUser): Promise<IUser | null> => {
  // auto incremental id
  const id = await generateUserIncrementalId()
  user.id = id

  // default password
  if (!user.password) {
    user.password = config.default_user_password as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('User created failed')
  }
  return createdUser
}

export default {
  createUserService,
}
