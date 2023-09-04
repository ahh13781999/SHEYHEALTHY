import { Button, Col, Form, Input, Row, TimePicker } from "antd"
import dayjs from "dayjs"

const DoctorForm = ({ submitForm, initialValues }) => {
  return (
    <Form
      layout='vertical'
      onFinish={submitForm}
      initialValues={{
        ...initialValues,
        ...(initialValues && {
          timings: [
            dayjs(initialValues?.timings[0]),
            dayjs(initialValues?.timings[1])
          ],
        }),
      }}
    >
      <h2 className='text-lg font-semibold text-gray-800 my-5'>
        Personal Information
      </h2>
      <Row gutter={20}>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='First Name'
            name='firstName'
            rules={[{ required: true }]}
          >
            <Input placeholder='First Name' />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Last Name'
            name='lastName'
            rules={[{ required: true }]}
          >
            <Input placeholder='Last Name' />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Email'
            name='email'
            rules={[{ required: true }]}
          >
            <Input placeholder='Email' />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Phone Number'
            name='phoneNumber'
            rules={[{ required: true }]}
          >
            <Input placeholder='Phone Number' />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Website'
            name='website'
            rules={[{ required: true }]}
          >
            <Input placeholder='Website' />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Address'
            name='address'
            rules={[{ required: true }]}
          >
            <Input placeholder='Address' />
          </Form.Item>
        </Col>
      </Row>
      <hr />
      <h2 className='text-lg font-semibold text-gray-800 my-5'>
        Professional Information
      </h2>
      <Row gutter={20}>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Specialization'
            name='specialization'
            rules={[{ required: true }]}
          >
            <Input placeholder='Specialization' />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Experience'
            name='experience'
            rules={[{ required: true }]}
          >
            <Input placeholder='Experience' type='number' />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Fee Per Consultation'
            name='feePerConsultation'
            rules={[{ required: true }]}
          >
            <Input placeholder='Fee Per Consultation' type='number' />
          </Form.Item>
        </Col>
        <Col span={6} xs={24} sm={24} lg={8}>
          <Form.Item
            required
            label='Timing'
            name='timings'
            rules={[{ required: true }]}
          >
            <TimePicker.RangePicker format='HH:mm'/>
          </Form.Item>
        </Col>
      </Row>
      <div className='flex w-full items-end justify-end'>
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default DoctorForm
