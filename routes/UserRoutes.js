const { Router } = require("express")
const router = Router()
const {
  Login,
  Register,
  Logout,
  GetSingleUser,
  GetAppointmentsByUserId,
} = require("../controllers/UserController")
const { AuthenticateUser } = require("../middleware/Authentication")

router.post("/login", Login)
router.post("/register", Register)
router.post("/logout", Logout)
router.post("/get-user", AuthenticateUser, GetSingleUser)
router.post(
  "/get-appointments-by-userId",
  AuthenticateUser,
  GetAppointmentsByUserId
)

module.exports = router
