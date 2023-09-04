require("dotenv").config()
const express = require("express")
const app = express()
const connectDB = require("./config/db")
// middleware
const cookieParser = require('cookie-parser');
// routers
const UserRouter = require("./routes/UserRoutes")
const AdminRouter = require("./routes/AdminRoutes")
const DoctorRouter = require("./routes/DoctorRoutes")
//middleware
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
// routes
app.use("/api/users", UserRouter)
app.use("/api/admin", AdminRouter)
app.use("/api/doctors", DoctorRouter)
// port
const port = process.env.PORT || 3000
// start
const Start = async () => {
  try {
    app.listen(port, console.log(`The server is listening on port ${port}`))
    await connectDB(process.env.MONGO_URI)
  } catch (error) {
    console.log(error)
  }
}

Start()
