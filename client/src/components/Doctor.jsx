import React from "react"
import { useNavigate } from "react-router-dom"

const Doctor = ({ doctor }) => {
  
  const navigate = useNavigate()

  return (
    <div className='border-4 flex flex-col space-y-2 cursor-pointer hover:bg-gray-100' onClick={() => navigate(`/book-appointment/${doctor._id}`)}>
      <div className='p-2'>
        <p className='font-semibold'>
          {doctor.firstName} {doctor.lastName}
        </p>
      </div>
      <div className='flex flex-col space-y-4 border-2 border-t-4 p-2'>
        <p>
          <span className="font-semibold">Phone Number : </span>
          {doctor.phoneNumber}
        </p>
        <p>
          <span className="font-semibold">Address : </span>
          {doctor.address}
        </p>
        <p>
          <span className="font-semibold">Fee Per Consultation : </span>
          {doctor.feePerConsultation}
        </p>
        <p>
          <span className="font-semibold">Timings : </span>
          {doctor.timings[0]} - {doctor.timings[1]}
        </p>
      </div>
    </div>
  )
}

export default Doctor
