import { useEffect, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import CustomLayout from "../layouts/custom"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../redux/alertSlice"
import { Row, Col } from "antd"
import Doctor from "../components/Doctor"

const Home = () => {
  const dispatch = useDispatch()
  const [doctors, setDoctors] = useState([])
  const getAllApprovedDoctors = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/doctors/get-all-approved-doctors",
        {},
        {
          withCredentials: true,
        }
      )
      setDoctors(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getAllApprovedDoctors()
  }, [])

  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Doctor Profile</h1>
        <hr />
        <Row gutter={20} className="mt-4">
          {doctors.map((doctor, index) => {
            return (
              <Col key={index} span={8} xs={24} sm={24} lg={8}>
                <Doctor doctor={doctor} />
              </Col>
            )
          })}
        </Row>
      </div>
    </CustomLayout>
  )
}

export default Home
