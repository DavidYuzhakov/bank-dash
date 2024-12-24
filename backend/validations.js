import { body } from "express-validator"

export const registerValidation =  [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'The password must be at least 8 chars').isLength({ min: 8 }),
  body('username', 'The username must be at least 3 chars').isLength({ min: 3 })
]

export const loginValidation = [
  body('email', 'Invalid email format').isEmail().exists(),
  body('password', 'The password must be at least 8 chars').isLength({ min: 8 }).exists(),
]
  