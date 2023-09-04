import { useDispatch, useSelector } from "react-redux"
import DoctorForm from "../../components/DoctorForm"
import CustomLayout from "../../layouts/custom"
import { hideLoading, showLoading } from "../../redux/alertSlice"
import axios from "axios"
import toast from "react-hot-toast"
import { useEffect, useState } from "react"
import dayjs from "dayjs"

const Profile = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)
  const [doctor, setDoctor] = useState(null)

  const submitForm = async (values) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/doctors/update-doctor-profile",
        {
          ...values,
          timings: [
            dayjs(values.timings[0]),
            dayjs(values.timings[1]),
          ],
        },
        {
          withCredentials: true,
        }
      )
      dispatch(hideLoading())
      toast.success(data.message)
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  const getDoctor = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/doctors/get-doctor-by-userId",
        {},
        {
          withCredentials: true,
        }
      )
      setDoctor(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getDoctor()
  }, [])

  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Doctor Profile</h1>
        <hr />
        {doctor && (
          <DoctorForm submitForm={submitForm} initialValues={doctor} />
        )}
      </div>
    </CustomLayout>
  )
}

export default Profile
