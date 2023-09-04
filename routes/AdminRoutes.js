const { Router } = require("express")
const router = Router()
const {
  MarkAllNotificationsAsSeen,
  DeleteAllNotifications,
  ApplyDoctorAccount,
  GetAllUsers,
  GetAllDoctors,
  ChangeDoctorStatus,
  BookAppointment,
  CheckBookingAvailability,
} = require("../controllers/AdminController")
const { AuthenticateUser } = require("../middleware/Authentication")

router.post("/apply-doctor-account", AuthenticateUser, ApplyDoctorAccount)
router.post(
  "/mark-all-notifications-as-seen",
  AuthenticateUser,
  MarkAllNotificationsAsSeen
)
router.post(
  "/delete-all-notifications",
  AuthenticateUser,
  DeleteAllNotifications
)
router.post("/get-all-users", AuthenticateUser, GetAllUsers)
router.post("/get-all-doctors", AuthenticateUser, GetAllDoctors)
router.post("/change-doctor-status", AuthenticateUser, ChangeDoctorStatus)
router.post("/book-appointment", AuthenticateUser, BookAppointment)
router.post(
  "/check-booking-availability",
  AuthenticateUser,
  CheckBookingAvailability
)

module.exports = router
