import React from "react"
import CustomLayout from "../layouts/custom"
import { Tabs } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { hideLoading, showLoading } from "../redux/alertSlice"
import axios from "axios"
import toast from "react-hot-toast"
import { setUser } from "../redux/userSlice"

const Notifications = () => {
  const { user } = useSelector((state) => state.users)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const markAllAsSeen = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/admin/mark-all-notifications-as-seen",
        {},
        {
          withCredentials: true,
        }
      )
      dispatch(setUser(data.user))
      dispatch(hideLoading())
      toast.success(data.message)
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  const deleteAll = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/admin/delete-all-notifications",
        {},
        {
          withCredentials: true,
        }
      )
      dispatch(setUser(data.user))
      dispatch(hideLoading())
      toast.success(data.message)
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  const items = [
    {
      key: "1",
      label: "Unseen",
      children: (
        <div>
          <div className='flex justify-end'>
            <p
              onClick={() => markAllAsSeen()}
              className='font-semibold py-2 underline underline-offset-2 cursor-pointer'
            >
              Mark all as seen
            </p>
          </div>
          <div className='flex flex-col space-y-2'>
            {user?.unseenNotifications.map((notification, index) => {
              return (
                <div
                  className='w-full p-2 border-2 rounded hover:bg-gray-200'
                  key={index}
                  onClick={() => navigate(notification.onClickPath)}
                >
                  <p className='font-semibold'>{notification.message}</p>
                </div>
              )
            })}
          </div>
        </div>
      ),
    },
    {
      key: "2",
      label: "Seen",
      children: (
        <div>
          <div className='flex justify-end'>
            <p
              onClick={() => deleteAll()}
              className='font-semibold py-2 underline underline-offset-2 cursor-pointer'
            >
              Delete all
            </p>
          </div>
          <div className='flex flex-col space-y-2'>
            {user?.seenNotifications.map((notification, index) => {
              return (
                <div
                  className='w-full p-2 border-2 rounded hover:bg-gray-200'
                  key={index}
                  onClick={() => navigate(notification.onClickPath)}
                >
                  <p className='font-semibold'>{notification.message}</p>
                </div>
              )
            })}
          </div>
        </div>
      ),
    },
  ]

  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Notifications</h1>
        <hr />
        <Tabs defaultActiveKey='0' items={items}></Tabs>
      </div>
    </CustomLayout>
  )
}

export default Notifications
