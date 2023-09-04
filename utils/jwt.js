const { sign, verify } = require("jsonwebtoken")

const CreateUserPayload = (user) => {
  return {
    userId: user._id,
    name: user.name,
    email: user.email,
  }
}

const IsTokenValid = (token) =>
  verify(token, process.env.JWT_SECRET)

const CreateJWT = (payload) => {
  const token = sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  })
  return token
}

const AttachCookiesToResponse = ({ user, res }) => {
  const userPayload = CreateUserPayload(user)
  const token = CreateJWT(userPayload)
  const oneDay = 24 * 60 * 60 * 1000

  res.cookie("token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + oneDay),
    signed: true,
  })
}

module.exports = {
  CreateUserPayload,
  IsTokenValid,
  CreateJWT,
  AttachCookiesToResponse,
}
