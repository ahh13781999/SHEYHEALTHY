import { useDispatch, useSelector } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import { useCookies } from "react-cookie"
import { useEffect } from "react"
import axios from "axios"
import { setUser } from "../redux/userSlice"
import { hideLoading, showLoading } from "../redux/alertSlice"

const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies()
  const { user } = useSelector((state) => state.users)

  const getUser = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/users/get-user",
        {},
        { withCredentials: true }
      )
      dispatch(setUser(data.user))
      localStorage.setItem("user", JSON.stringify(data.user))
      dispatch(hideLoading())
    } catch (error) {
      localStorage.clear()
      removeCookie("token")
      dispatch(hideLoading())
      navigate("/login")
    }
  }


  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [user])

  if (user || cookies["token"]) {
    return children
  } else {
    return <Navigate to='/login' />
  }
}

export default PrivateRoute
