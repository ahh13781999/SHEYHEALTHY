const { StatusCodes } = require("http-status-codes")
const User = require("../models/User")
const Doctor = require("../models/Doctor")
const Appointment = require("../models/Appointment")
const dayjs = require("dayjs")
var isBetween = require("dayjs/plugin/isBetween")
dayjs.extend(isBetween)

const ApplyDoctorAccount = async (req, res) => {
  try {
    const doctor = await Doctor.create({ ...req.body, user: req.user.userId })
    const admin = await User.findOne({ isAdmin: true })
    admin.unseenNotifications.push({
      type: "new-doctor-request",
      message: `${doctor.firstName} ${doctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: doctor._id,
        name: doctor.firstName + " " + doctor.lastName,
      },
      onClickPath: "/admin/doctors",
    })
    await admin.save()
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Doctor added successfully!" })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const MarkAllNotificationsAsSeen = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    user.seenNotifications = user.unseenNotifications
    user.unseenNotifications = []
    await user.save()
    return res
      .status(StatusCodes.OK)
      .json({ message: "All notifications marked as read", user })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const DeleteAllNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
    user.seenNotifications = []
    user.unseenNotifications = []
    await user.save()
    return res
      .status(StatusCodes.OK)
      .json({ message: "All notifications got deleted", user })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const GetAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select("name email createdAt")
    return res.status(StatusCodes.OK).json(users)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const GetAllDoctors = async (req, res) => {
  try {
    const users = await Doctor.find({}).select(
      "firstName lastName email phoneNumber status createdAt"
    )
    return res.status(StatusCodes.OK).json(users)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const ChangeDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {
      status,
    })
    const user = await User.findById(doctor.user)
    user.unseenNotifications.push({
      type: "new-doctor-request-changed",
      message: `Your doctor account has been ${status}`,
      onClickPath: "/notifications",
    })

    user.isDoctor = status === "approved" ? true : false

    await user.save()

    return res
      .status(StatusCodes.OK)
      .json({ message: `Doctor account has been ${status}` })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

const BookAppointment = async (req, res) => {
  try {
    req.body.status = "pending"
    req.body.date = dayjs(req.body.date).format("DD-MM-YYYY").toString()
    req.body.time = dayjs(req.body.time)
    const appointment = new Appointment(req.body)
    await appointment.save()
    const user = await User.findById(req.body.doctorInfo.user)
    user.unseenNotifications.push({
      type: "new appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/doctor/appointments",
    })
    await user.save()
    return res
      .status(StatusCodes.CREATED)
      .json({ message: "Appointment booked successfully" })
  } catch (error) {
    return res.status(StatusCodes.OK).json({ message: error.message })
  }
}

const CheckBookingAvailability = async (req, res) => {
  try {
    const date = dayjs(req.body.date).format("DD-MM-YYYY").toString()
    const fromTime = dayjs(req.body.time).subtract("1", "hour")
    const toTime = dayjs(req.body.time).add("1", "hour")
    const doctorId = req.body.doctorId

    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
      status: "approved",
    })

    const doctor = await Doctor.findById(doctorId)
    const doctorToTime = dayjs(doctor.timings[0])
    const doctorFromTime = dayjs(doctor.timings[1])

    if (!dayjs(fromTime).isBetween(doctorFromTime, doctorToTime)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Appointment not available", bookingAvailable: false })
    } else if (appointments.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Appointment not available", bookingAvailable: false })
    } else {
      return res
        .status(StatusCodes.OK)
        .json({ message: "Appointment available", bookingAvailable: true })
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

module.exports = {
  ApplyDoctorAccount,
  DeleteAllNotifications,
  MarkAllNotificationsAsSeen,
  GetAllUsers,
  GetAllDoctors,
  ChangeDoctorStatus,
  BookAppointment,
  CheckBookingAvailability,
}
