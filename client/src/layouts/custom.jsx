import logo from "../assets/logo1.svg"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, Link, useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../redux/alertSlice"
import toast from "react-hot-toast"
import axios from "axios"
import { Badge } from "antd"

const CustomLayout = ({ children }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const { user } = useSelector((state) => state.users)

  const logout = async () => {
    dispatch(showLoading())
    try {
      await axios.post("api/users/logout", {}, { withCredentials: true })
      localStorage.clear()
      dispatch(hideLoading())
      toast.loading("User logging out!", { duration: 3000 })
      setTimeout(() => {
        navigate("/login")
      }, 3000)
    } catch (error) {
      dispatch(hideLoading())
      toast.error("Something went wrong try again later!")
    }
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 780) {
        setCollapsed(true)
      } else {
        setCollapsed(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    }
  ]

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Doctors",
      path: "/admin/doctors",
      icon: "ri-nurse-line",
    },
  ]

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/doctor/appointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "ri-user-line",
    },
  ]

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu

const role = user?.isAdmin ? "Admin" : user?.isDoctor ? "Doctor" : "User"

  return (
    <div className='flex flex-row justify-stretch items-stretch w-full h-full'>
      <div
        id='sidebar'
        className={`${
          collapsed ? "w-20" : "w-64"
        } flex flex-col min-h-screen p-5 bg-[#005555] shadow rounded-r transition-all`}
      >
        <div
          id='sidebar-header'
          className='flex flex-col items-center justify-center w-full'
        >
          <img src={logo} alt='logo' width='200' />
          <p className="text-white font-semibold">{role}</p>
        </div>
        <div id='menu' className='mt-12'>
          {menuToBeRendered.map((menu, index) => {
            return (
              <div key={index} className='flex flex-col my-6'>
                <NavLink
                  to={menu.path}
                  className={({ isActive }) =>
                    isActive
                      ? "flex items-center text-white text-base bg-[#013737] p-2 rounded space-x-4"
                      : "flex items-center text-white text-base p-2 hover:text-gray-400 space-x-4"
                  }
                >
                  <i className={`${menu.icon} ${collapsed && "text-3xl"}`}></i>
                  {!collapsed && <span>{menu.name}</span>}
                </NavLink>
              </div>
            )
          })}
          <div className='flex flex-col my-6'>
            <div
              onClick={() => logout()}
              className='flex items-center text-white text-base p-2 hover:text-gray-400 space-x-4 cursor-pointer'
            >
              <i className={`${collapsed && "text-3xl"} ri-login-box-line`}></i>
              {!collapsed && <span>Logout</span>}
            </div>
          </div>
        </div>
      </div>
      <div
        id='content'
        className='flex flex-col items-stretch justify-stretch min-h-full w-full mx-6'
      >
        <div
          className='flex items-center justify-between bg-white rounded shadow mb-5 h-20 w-full'
          id='header'
        >
          <i
            onClick={() => setCollapsed(!collapsed)}
            className='ri-close-fill text-2xl cursor-pointer ml-2'
          ></i>
          <div className='flex items-center space-x-2 mr-4'>
            <Badge
              className='cursor-pointer'
              count={user?.unseenNotifications?.length}
              onClick={() => navigate("/notifications")}
            >
              <i className='ri-notification-line header-action-icon text-xl'></i>
            </Badge>
            <p className="">{user?.name}</p>
          </div>
        </div>
        <div id='body' className='bg-white rounded shadow h-full'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default CustomLayout
