import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const MyAppoinments = () => {

  const { doctors } = useContext(AppContext)

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      
      {/* Heading */}
      <p className="text-xl sm:text-2xl font-semibold text-gray-700 border-b pb-4">
        My Appointments
      </p>

      <div className="mt-6 space-y-6">
        {doctors.slice(0, 3).map((item, index) => (
          
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:justify-between sm:items-center border-b pb-6 gap-6"
          >

            {/* Left Section */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full">
              
              {/* Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gray-100 rounded-lg overflow-hidden mx-auto sm:mx-0">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Doctor Details */}
              <div className="text-center sm:text-left">
                <p className="text-base sm:text-lg font-semibold text-gray-800">
                  {item.name}
                </p>
                <p className="text-gray-500 text-sm sm:text-base">
                  {item.speciality}
                </p>

                <p className="mt-3 font-medium text-gray-700">
                  Address:
                </p>
                <p className="text-gray-500 text-sm">
                  {item.address.line1}
                </p>
                <p className="text-gray-500 text-sm">
                  {item.address.line2}
                </p>

                <p className="mt-3 text-sm text-gray-600">
                  <span className="font-medium text-gray-700">
                    Date & Time:
                  </span>{' '}
                  25, July, 2026 | 8:30 PM
                </p>
              </div>
            </div>

            {/* Buttons Section */}
            <div className="flex flex-col gap-3 w-full sm:w-auto">
              
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 w-full sm:w-auto">
                Pay Online
              </button>

              <button className="border border-gray-300 text-gray-600 px-6 py-2 rounded-md hover:bg-red-600 hover:text-white transition-all duration-300 w-full sm:w-auto">
                Cancel Appointment
              </button>

            </div>

          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppoinments