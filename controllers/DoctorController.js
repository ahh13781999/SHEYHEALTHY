const { StatusCodes } = require("http-status-codes")
const Doctor = require("../models/Doctor")
const Appointment = require("../models/Appointment")
const User = require("../models/User")

const GetDoctorByUserId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.userId })
    return res.status(StatusCodes.OK).json(doctor)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const UpdateDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findOneAndUpdate(
      {
        user: req.user.userId,
      },
      req.body,
      { new: true, runValidators: true }
    )
    return res
      .status(StatusCodes.OK)
      .json({ message: "Doctor profile updated successfully!", doctor })
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later!" })
  }
}

const GetAllApprovedDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" })
    return res.status(StatusCodes.OK).json(doctors)
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later" })
  }
}

const GetDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.body.doctorId)
    res.status(StatusCodes.OK).json(doctor)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later" })
  }
}

const GetAppointmentsByDoctorId = async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ user: req.user.userId })
    const appointments = await Appointment.find({ doctorId: doctor._id })
    res.status(StatusCodes.OK).json(appointments)
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Something went wrong try again later" })
  }
}

const ChangeAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      {
        status,
      },
      { new: true, runValidators: true }
    )

    const user = await User.findById(appointment.userId)
    user.unseenNotifications.push({
      type: "appointment-status-changed",
      message: `Your appointment status has been ${status}`,
      onClickPath: "/appointments",
    })

    await user.save()
    res
      .status(StatusCodes.OK)
      .json({ message: "Appointment status updated successfully" })
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message })
  }
}

module.exports = {
  GetDoctorByUserId,
  UpdateDoctorProfile,
  GetAllApprovedDoctors,
  GetDoctorById,
  GetAppointmentsByDoctorId,
  ChangeAppointmentStatus,
}
