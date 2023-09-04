import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { useSelector } from "react-redux"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import Loader from "./components/Loader"
import PrivateRoute from "./middleware/PrivateRoute"
import PublicRoute from "./middleware/PublicRoute"
import ApplyDoctor from "./pages/ApplyDoctor"
import Notifications from "./pages/Notifications"
import UsersList from "./pages/Admin/UsersList"
import DoctorsList from "./pages/Admin/DoctorsList"
import Profile from "./pages/Doctor/Profile"
import BookAppointment from "./pages/BookAppointment"
import Appointments from "./pages/Appointments"
import DoctorAppointments from "./pages/Doctor/DoctorAppointments"

function App() {
  const { loading } = useSelector((state) => state.alerts)
  return (
    <BrowserRouter>
      {loading && <Loader />}
      <Toaster position='top-center' reverseOrder={false} />
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/register'
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path='/apply-doctor'
          element={
            <PrivateRoute>
              <ApplyDoctor />
            </PrivateRoute>
          }
        />
        <Route
          path='/notifications'
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
        <Route path='/admin'>
          <Route
            path='users'
            element={
              <PrivateRoute>
                <UsersList />
              </PrivateRoute>
            }
          />
          <Route
            path='doctors'
            element={
              <PrivateRoute>
                <DoctorsList />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path='/doctor'>
          <Route
            path='profile/:userId'
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path='appointments'
            element={
              <PrivateRoute>
                <DoctorAppointments />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path='/book-appointment/:doctorId'
          element={
            <PrivateRoute>
              <BookAppointment />
            </PrivateRoute>
          }
        />
        <Route
          path='/appointments'
          element={
            <PrivateRoute>
              <Appointments />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
