import {Router} from 'express'
import users from '../middlewares/users'

const router = Router()

router.get('/', users.getManyUsers)
router.post('/', users.createUser)
router.put('/:id', users.updateUser)
router.delete('/:id', users.deleteUser)

export default router