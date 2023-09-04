import { useDispatch, useSelector } from "react-redux"
import CustomLayout from "../layouts/custom"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { hideLoading, showLoading } from "../redux/alertSlice"
import axios from "axios"
import { Row, Col, DatePicker, TimePicker, Button } from "antd"
import dayjs from "dayjs"
import { toast } from "react-hot-toast"

const BookAppointment = () => {
  const { user } = useSelector((state) => state.users)
  const { doctorId } = useParams()
  const dispatch = useDispatch()
  const [doctor, setDoctor] = useState(null)
  const [isAvailable, setIsAvailable] = useState(false)
  const [date, setDate] = useState()
  const [time, setTime] = useState()

  const getDoctorData = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/doctors/get-doctor-by-id",
        {
          doctorId,
        },
        {
          withCredentials: true,
        }
      )
      setDoctor(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
    }
  }

  const bookAppointmentNow = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/admin/book-appointment",
        {
          doctorId,
          userId: user._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
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

  const checkBookingAvailability = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/admin/check-booking-availability",
        {
          doctorId,
          date: date,
          time: time,
        },
        {
          withCredentials: true,
        }
      )
      dispatch(hideLoading())
      if (data.bookingAvailable) {
        setIsAvailable(true)
        toast.success(data.message)
      } else {
        setIsAvailable(false)
        toast.error(data.message)
      }
    } catch (error) {
      dispatch(hideLoading())
      setIsAvailable(false)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getDoctorData()
  }, [])

  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Book Appointment</h1>
        <hr />
        {doctor && (
          <div className='mt-4'>
            <div className='flex flex-col space-y-4'>
              <p className='font-medium text-lg'>
                {doctor.firstName} {doctor.lastName}
              </p>
              <hr />
              <Row>
                <Col span={8} sm={24} xs={24} lg={8}>
                  <p className='my-3'>
                    <span className='font-semibold'>Timings : </span>
                    {dayjs(doctor.timings[0]).format("HH:mm")} - {dayjs(doctor.timings[1]).format("HH:mm")}
                  </p>
                  <div className='flex flex-col space-y-2'>
                    <DatePicker
                      aria-required
                      format='DD-MM-YYYY'
                      onChange={(value) =>
                        setDate(dayjs(value))
                      }
                    />
                    <TimePicker
                      aria-required
                      format='HH:mm'
                      onChange={(value) => {
                        setTime(dayjs(value))
                      }}
                    />
                    <Button
                      type='primary'
                      onClick={() => checkBookingAvailability()}
                    >
                      Check Availability
                    </Button>
                    <Button
                      onClick={() => bookAppointmentNow()}
                      type='default'
                      disabled={!isAvailable}
                      className='bg-orange-400 text-white hover:bg-white hover:text-orange-400'
                    >
                      Book Now
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        )}
      </div>
    </CustomLayout>
  )
}

export default BookAppointment
