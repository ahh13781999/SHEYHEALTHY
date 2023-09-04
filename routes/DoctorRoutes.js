const { Router } = require("express")
const {
  GetDoctorByUserId,
  UpdateDoctorProfile,
  GetAllApprovedDoctors,
  GetDoctorById,
  GetAppointmentsByDoctorId,
  ChangeAppointmentStatus,
} = require("../controllers/DoctorController")
const router = Router()
const { AuthenticateUser } = require("../middleware/Authentication")

router.post("/get-doctor-by-userId", AuthenticateUser, GetDoctorByUserId)
router.post("/update-doctor-profile", AuthenticateUser, UpdateDoctorProfile)
router.post("/get-all-approved-doctors", GetAllApprovedDoctors)
router.post("/get-doctor-by-id", GetDoctorById)
router.post(
  "/get-appointments-by-doctorId",
  AuthenticateUser,
  GetAppointmentsByDoctorId
)
router.post("/change-appointment-status",AuthenticateUser, ChangeAppointmentStatus)

module.exports = router
