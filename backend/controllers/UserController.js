import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

import UserModel from '../models/User.js'
import generateTokens from '../utils/generateTokens.js'

const register = async (req, res) => {
  try {
    const { password, email, username } = req.body
    const isMatch = await UserModel.findOne({ email })

    if (isMatch) {
      res.status(400).json({
        message: 'The user already exists',
      })
    }

    const salt = await bcrypt.genSalt(10)
    const passwordHash = await bcrypt.hash(password, salt)

    const doc = new UserModel({
      email,
      username,
      password: passwordHash,
    })
    const user = await doc.save()

    const { refreshToken, accessToken } = generateTokens(user.id)
    res
      .cookie('refresh_token', refreshToken, { httpOnly: true })
      .status(201)
      .json({
        jwt: accessToken,
        userId: user.id,
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to register',
    })
  }
}

const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email })
    if (!user) {
      return res.status(404).json({
        message: 'Invalid email or password',
      })
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password)

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid email or password',
      })
    }

    const { accessToken, refreshToken } = generateTokens(user.id)

    res.cookie('refresh_token', refreshToken, { httpOnly: true }).status(200).json({
      jwt: accessToken,
      userId: user.id,
    })
  } catch (err) {
    console.log(err),
      res.status(500).json({
        message: 'Failed to login',
      })
  }
}

const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
    const { accessToken } = generateTokens(decoded.userId)

    res
      .status(200)
      .cookie('refresh_token', refreshToken, { httpOnly: true })
      .json({
        jwt: accessToken,
        userId: decoded.userId
      })
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to refresh token'
    })
  }
} 

const logout = async (_, res) => {
  res
    .clearCookie('refresh_token')
    .status(200)
    .json({ message: 'Successfully logged out'})
}


export default { register, login, refresh, logout }