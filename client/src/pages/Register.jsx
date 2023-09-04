import { Form, Input } from "antd"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { hideLoading, showLoading } from "../redux/alertSlice"
import { setUser } from "../redux/userSlice"

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    dispatch(showLoading())
    try {
      const { data } = await axios.post("/api/users/register", values)
      dispatch(setUser(data.user))
      dispatch(hideLoading())
      toast.success(data.message)
      toast.loading("Redirecting to home page", { duration: 3000 })
      setTimeout(() => {
        navigate("/")
      }, 3000)
    } catch (error) {
      dispatch(hideLoading())
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#005555]'>
      <div className='shadow-md w-[400px] p-4 rounded border-2 bg-white'>
        <p className='text-2xl font-semibold mb-4 bg-orange-400 max-w-fit text-white py-2 px-4 -ml-10 rounded-bl-lg capitalize'>
          nice to meet you
        </p>
        <Form layout='vertical' onFinish={handleSubmit}>
          <Form.Item
            label={<p className='font-semibold text-base'>Name</p>}
            name='name'
          >
            <Input
              placeholder='Name'
              className='border-2 border-gray-300 rounded py-2'
              required
            />
          </Form.Item>
          <Form.Item
            label={<p className='font-semibold text-base'>Email</p>}
            name='email'
          >
            <Input
              placeholder='Email'
              type='email'
              className='border-2 border-gray-300 rounded py-2'
              required
            />
          </Form.Item>
          <Form.Item
            label={<p className='font-semibold text-base'>Password</p>}
            name='password'
          >
            <Input
              placeholder='Password'
              type='password'
              className='border-2 border-gray-300 rounded py-2'
              required
            />
          </Form.Item>
          <button
            type='submit'
            className='bg-[#005555] text-white font-semibold text-base rounded py-2 hover:opacity-80 w-full mb-2'
          >
            Register
          </button>
          <Link
            to='/login'
            className='underline text-black w-full text-base uppercase'
          >
            Already have an account? click here
          </Link>
        </Form>
      </div>
    </div>
  )
}

export default Register
