import { Router } from 'express'
import UserController from '../controllers/UserController.js'
import validationErrors from '../utils/validationErrors.js'
import { loginValidation, registerValidation } from '../validations.js'

const router = Router()

// /auth/register
router.post('/register', registerValidation, validationErrors, UserController.register)
router.post('/login', loginValidation, validationErrors, UserController.login)
router.get('/refresh-token', UserController.refresh)
router.get('/logout', UserController.logout)

export default router
