import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
    const { doctors, aToken, getAllDoctors,changeAvailability } = useContext(AdminContext)

    useEffect(() => {
        if (aToken) {
            getAllDoctors()
        }
    }, [aToken])

    return (
        <div className="m-5 h-[calc(100vh-80px)] flex flex-col">
            <h1 className="text-lg font-medium text-gray-700 mb-5">All Doctors</h1>

            {/* Scrollable grid only */}
            <div className="overflow-y-auto flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {doctors.map((item, index) => (
                        <div
                            key={index}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 
                                       hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                        >
                            {/* Image area — bg changes on card hover */}
                            <div className="bg-indigo-50 group-hover:bg-blue-400 transition-colors duration-300">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-full h-48 object-cover object-top"
                                />
                            </div>

                            {/* Doctor Info */}
                            <div className="p-3">
                                <p className="text-sm font-semibold text-gray-800 truncate">{item.name}</p>
                                <p className="text-xs text-gray-500 mt-0.5">{item.speciality}</p>

                                {/* Availability */}
                                <div className="flex items-center gap-1.5 mt-2">
                                    <input
                                    onChange={()=>changeAvailability(item._id)}
                                        type="checkbox"
                                        checked={item.available}
                                        readOnly
                                        className="accent-blue-500 w-3.5 h-3.5 cursor-pointer"
                                    />
                                    <p className={`text-xs font-medium ${item.available ? 'text-green-500' : 'text-red-400'}`}>
                                        {item.available ? 'Available' : 'Unavailable'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DoctorsList