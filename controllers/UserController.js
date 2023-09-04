const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const Appointment = require("../models/Appointment")
const { AttachCookiesToResponse } = require("../utils/jwt")

const Login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Wrong email or password" })
    }
    const isPasswordCorrect = await user.VerifyPassword(password)
    if (!isPasswordCorrect) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Wrong email or password" })
    }
    AttachCookiesToResponse({ user, res })
    return res.status(StatusCodes.OK).json({
      message: "You logged in successfully!",
      user: {
        userId: user._id,
        name: user.name,
        email: user.email,
      },
    })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const Register = async (req, res) => {
  const { name, email, password } = req.body
  try {
    const emailAlreadyExists = await User.findOne({ email })
    if (emailAlreadyExists) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: "Email already exists!" })
    }
    const user = await User.create({ name, email, password })
    AttachCookiesToResponse({ user, res })
    return res.status(StatusCodes.CREATED).json({
      message: "User created successfully!",
      user: { userId: user._id, name: user.name, email: user.email },
    })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const Logout = async (req, res) => {
  res.cookie("token", "logout", {
    expires: new Date(Date.now() + 1000),
    httpOnly: false,
    secure: false,
    signed: true,
  })
  return res.status(StatusCodes.OK).json({
    message: "User logged out successfully!",
  })
}

const GetSingleUser = async (req, res) => {
  try {
    const { userId } = req.user
    const user = await User.findById(userId).select("-password")

    return res.status(StatusCodes.OK).json({ user })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const GetAppointmentsByUserId = async (req, res) => {
  try {
    const { userId } = req.user
    const user = await Appointment.find({ userId })
    return res.status(StatusCodes.OK).json(user)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

module.exports = {
  Login,
  Register,
  Logout,
  GetSingleUser,
  GetAppointmentsByUserId,
}
