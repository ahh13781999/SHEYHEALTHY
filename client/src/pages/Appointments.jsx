import { useEffect, useState } from "react"
import CustomLayout from "../layouts/custom"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../redux/alertSlice"
import { toast } from "react-hot-toast"
import axios from "axios"
import { Table, Tag } from "antd"
import dayjs from "dayjs"

const Appointments = () => {
  const dispatch = useDispatch()
  const [appointments, setAppointment] = useState([])

  const getAppointments = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/users/get-appointments-by-userId",
        {},
        {
          withCredentials: true,
        }
      )
      setAppointment(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getAppointments()
  }, [])

  const columns = [
    {
        title: "Id",
        dataIndex: "_id",
    },
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>
          {record.doctorInfo.phoneNumber} 
        </span>
      ),
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {dayjs(record.date).format("DD-MM-YYYY")} {dayjs(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
        title: "Status",
        dataIndex: "status",
        render: (text,record) => (
          <Tag color="success">{record.status}</Tag>
        )
    }
  ];

  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Appointments</h1>
        <hr />
        <Table columns={columns} dataSource={appointments} />
      </div>
    </CustomLayout>
  )
}

export default Appointments
