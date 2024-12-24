import jwt from "jsonwebtoken"

export default (userId) => {
  const JWT_ACCESS_SECRET = process.env.JWT_ACCESS_SECRET
  const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET

  const accessToken = jwt.sign(
    {
      userId
    },
    JWT_ACCESS_SECRET,
    {
      expiresIn: '1h'
    }
  )

  const refreshToken = jwt.sign(
    {
      userId
    },
    JWT_REFRESH_SECRET,
    {
      expiresIn: '30d'
    }
  )

  return { accessToken, refreshToken }
}