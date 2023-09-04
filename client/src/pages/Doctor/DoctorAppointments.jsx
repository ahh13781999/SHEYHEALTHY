import { Table, Tag } from "antd"
import CustomLayout from "../../layouts/custom"
import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../../redux/alertSlice"
import axios from "axios"
import { toast } from "react-hot-toast"

const DoctorAppointments = () => {
  const dispatch = useDispatch()
  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/doctors/get-appointments-by-doctorId",
        {},
        {
          withCredentials: true,
        }
      )
      setAppointments(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  const changeAppointmentStatus = async (record, status) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/doctors/change-appointment-status",
        {
          appointmentId: record._id,
          status: status,
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

  useEffect(() => {
    getAppointments()
  }, [])

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {dayjs(record.date).format("DD-MM-YYYY")}{" "}
          {dayjs(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (text, record) => (
        <Tag
          bordered={false}
          color={record.status === "pending" ? "warning" : "cyan"}
        >
          {record.status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className='flex'>
          {record.status === "pending" && (
            <div className='flex'>
              <Tag
                color='success'
                className='cursor-pointer'
                onClick={() => changeAppointmentStatus(record, "approved")}
              >
                Approve
              </Tag>
              <Tag
                color='error'
                className='cursor-pointer'
                onClick={() => changeAppointmentStatus(record, "rejected")}
              >
                Reject
              </Tag>
            </div>
          )}
        </div>
      ),
    },
  ]

  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Doctor Appointments</h1>
        <hr />
        <Table columns={columns} dataSource={appointments} />
      </div>
    </CustomLayout>
  )
}

export default DoctorAppointments
