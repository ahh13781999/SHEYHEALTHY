import CustomLayout from "../../layouts/custom"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../../redux/alertSlice"
import { toast } from "react-hot-toast"
import axios from "axios"
import { useEffect, useState } from "react"
import { Table } from "antd"
import dayjs from 'dayjs'

const UsersList = () => {
  const dispatch = useDispatch()
  const [users, setUsers] = useState([])

  const getAllUsers = async () => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post(
        "/api/admin/get-all-users",
        {},
        {
          withCredentials: true,
        }
      )
      setUsers(data)
      dispatch(hideLoading())
    } catch (error) {
      dispatch(hideLoading())
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (text, record) => (
        <p>{dayjs(record.createdAt).format("DD-MM-YYYY")}</p>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className='flex'>
          <button className='rounded text-white font-semibold py-2 px-4 hover:opacity-80 bg-red-600'>
            Block
          </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    getAllUsers()
  }, [])

  return (
    <CustomLayout>
      <div className='p-2'>
        <h1 className='font-semibold text-2xl mb-6'>Users</h1>
        <hr />
        <Table columns={columns} dataSource={users} />
      </div>
    </CustomLayout>
  )
}

export default UsersList
