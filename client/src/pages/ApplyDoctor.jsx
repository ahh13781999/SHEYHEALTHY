import { useDispatch, useSelector } from "react-redux"
import CustomLayout from "../layouts/custom"
import { hideLoading, showLoading } from "../redux/alertSlice"
import axios from "axios"
import toast from "react-hot-toast"
import DoctorForm from "../components/DoctorForm"
import dayjs from "dayjs"

const ApplyDoctor = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.users)

  const submitForm = async (values) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/admin/apply-doctor-account",
        {
          ...values,
          timings: [
            dayjs(values.timings[0]),
            dayjs(values.timings[1])
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
  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Apply Doctor</h1>
        <hr />
        <DoctorForm submitForm={submitForm} />
      </div>
    </CustomLayout>
  )
}

export default ApplyDoctor
