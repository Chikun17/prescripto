import React, { useState } from 'react'
import { assets } from '../assets/assets'

const MyProfile = () => {

  const [userData,setUserdata] = useState({
    name:"Edward Vincent",
    image:assets.profile_pic,
    email:'richardjameswap@gmail.com',
    phone:'+1  123 456 7890',
    address:{
      line1:"57th Cross, Richmond ",
      line2:"Circle, Church Road, London"
    },
    gender:"Male",
    dob:'2008-09-16'   // ISO date format for input type=date compatibility
  })

  const [isEdit,setIsEdit] = useState(false)

  // Format dob for display when not editing (e.g. 16 September, 2008)
  const formatDOB = (dob) => {
    if (!dob) return ''
    const d = new Date(dob)
    return d.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">

      <div className="flex items-center space-x-6">
        <img src={userData.image} alt="profile" className="w-40 h-40 rounded-lg object-cover shadow" />
        <div>
          {isEdit ? (
            <input 
              className="border p-2 rounded w-full text-lg font-semibold" 
              type="text" 
              value={userData.name} 
              onChange={e => setUserdata(prev => ({...prev, name: e.target.value}))} 
            />
          ) : (
            <p className="text-3xl font-semibold text-gray-900">{userData.name}</p>
          )}
        </div>
      </div>

      <hr className="border-gray-300" />

      {/* Contact Information */}
      <section className="space-y-4">
        <p className="uppercase tracking-wide text-gray-600 font-semibold">Contact Information</p>

        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-medium">Email id:</p>
          <p className="col-span-2 text-blue-600">{userData.email}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="col-span-2 border p-2 rounded"
              type="text"
              value={userData.phone}
              onChange={e => setUserdata(prev => ({...prev, phone: e.target.value}))}
            />
          ) : (
            <p className="col-span-2 text-blue-600">{userData.phone}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 items-start">
          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div className="col-span-2 space-y-1">
              <input
                className="border p-2 rounded w-full"
                type="text"
                value={userData.address.line1}
                onChange={e => setUserdata(prev => ({...prev, address: {...prev.address, line1: e.target.value}}))}
              />
              <input
                className="border p-2 rounded w-full"
                type="text"
                value={userData.address.line2}
                onChange={e => setUserdata(prev => ({...prev, address: {...prev.address, line2: e.target.value}}))}
              />
            </div>
          ) : (
            <p className="col-span-2 whitespace-pre-line">{userData.address.line1}{"\n"}{userData.address.line2}</p>
          )}
        </div>
      </section>

      {/* Basic Information */}
      <section className="space-y-4">
        <p className="uppercase tracking-wide text-gray-600 font-semibold">Basic Information</p>

        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="col-span-2 border p-2 rounded"
              value={userData.gender}
              onChange={e => setUserdata(prev => ({...prev, gender: e.target.value}))}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          ) : (
            <p className="col-span-2">{userData.gender}</p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 items-center">
          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="col-span-2 border p-2 rounded"
              type="date"
              value={userData.dob}
              onChange={e => setUserdata(prev => ({...prev, dob: e.target.value}))}
            />
          ) : (
            <p className="col-span-2">{formatDOB(userData.dob)}</p>
          )}
        </div>
      </section>

      {/* Buttons */}
      <div className="flex space-x-4 mt-6">
        {isEdit ? (
          <button
            onClick={() => setIsEdit(false)}
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            Save Information
          </button>
        ) : (
          <button
            onClick={() => setIsEdit(true)}
            className="px-6 py-2 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition"
          >
            Edit
          </button>
        )}
      </div>

    </div>
  )
}

export default MyProfile