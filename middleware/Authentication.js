const { IsTokenValid } = require("../utils/jwt")

const AuthenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token

  if (!token) {
    throw new Error("User unauthenticated")
  }

  try {
    const { userId, name, email } = IsTokenValid(token)
    req.user = { userId, name, email }
    next()
  } catch (error) {
    throw new Error("User unauthenticated")
  }
}

const AuthorizePermissions = (err, req, res, next) => {
  if (req.user) {
    next()
  } else {
    throw new Error("Unauthorized to access this route")
  }
}

module.exports = {
  AuthenticateUser,
  AuthorizePermissions
}
