import { useDispatch } from "react-redux"
import CustomLayout from "../../layouts/custom"
import { useEffect, useState } from "react"
import axios from "axios"
import { hideLoading, showLoading } from "../../redux/alertSlice"
import { toast } from "react-hot-toast"
import { Table } from "antd"
import dayjs from 'dayjs'

const DoctorsList = () => {
  const dispatch = useDispatch()
  const [doctors, setDoctors] = useState([])

  const getAllDoctors = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/admin/get-all-doctors",
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

  const changeDoctorStatus = async (record, status) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/admin/change-doctor-status",
        {
          doctorId: record._id,
          status,
        },
        {
          withCredentials: true,
        }
      )
      getAllDoctors()
      dispatch(hideLoading())
      toast.success(data.message)
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "",
      render: (text, record) => (
        <p className='flex'>
          {record.firstName} {record.lastName}
        </p>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => (
        <p>{dayjs(record.createdAt).format("DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className='flex'>
          {record.status === "pending" && <button
            onClick={() => changeDoctorStatus(record, "approved")}
            className='rounded text-white font-semibold py-2 px-4 hover:opacity-80 bg-green-600'
          >
            Approve
          </button>}
          {record.status === "approved" && (
            <button
              onClick={() => changeDoctorStatus(record, "blocked")}
              className='rounded text-white font-semibold py-2 px-4 hover:opacity-80 bg-red-600'
            >
              Block
            </button>
          )}
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllDoctors()
  }, [])

  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Doctors</h1>
        <hr />
        <Table columns={columns} dataSource={doctors} />
      </div>
    </CustomLayout>
  )
}

export default DoctorsList
