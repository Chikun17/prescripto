import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {

    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 Year')
    const [fees,setFees] = useState('')
    const [about,setAbout] = useState('')
    const [speciality,setSpeciality] = useState('General physician') // fixed typo
    const [degree,setDegree] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')

    const {backendUrl,aToken} = useContext(AdminContext)

    const onSubmitHandller = async (event) =>{
        event.preventDefault()

        try{
            if(!docImg){
                return toast.error('Image not selected')
            }

            const formData = new FormData()
            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)

            // ✅ FIXED KEY (was "addess")
            formData.append('address', JSON.stringify({
                line1: address1,
                line2: address2
            }))

            // ✅ DEBUG
           console.log("TOKEN:", aToken)

            const { data } = await axios.post(
                backendUrl + '/api/admin/add-doctor',
                formData,
                {
                    headers: {
                        atoken: aToken   // ✅ IMPORTANT FIX
                    }
                }
            )

            if(data.success){
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setEmail('')
                setAddress1('')
                setAddress2('')
                setAbout('')
                setDegree('')
                setFees('')   
                
            }else{
                toast.error(data.message)
            }

        }catch(err){
            console.log(err)
            toast.error('Something went wrong')
        }
    }

  return (
    <div className="h-screen flex flex-col bg-[#F8FAFC]">

      <form onSubmit={onSubmitHandller} className="w-full max-w-4xl mx-auto p-4 h-full overflow-y-auto">

        <p className="text-xl font-semibold mb-4 text-gray-700">Add Doctor</p>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">

          <div className="flex flex-col lg:flex-row gap-6">

            {/* Upload */}
            <div className="flex flex-col items-center gap-2">
              <label htmlFor="doc-img" className="cursor-pointer">
                <img 
                  src={docImg ? URL.createObjectURL(docImg) :assets.upload_area}
                  alt=""
                  className="w-20 h-20 object-cover rounded-full border border-gray-200"
                />
              </label>
              <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
              <p className="text-xs text-gray-500 text-center"> 
                Upload doctor <br /> picture
              </p>
            </div>

            {/* Form */}
            <div className="flex-1 flex flex-col gap-5">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* LEFT */}
                <div className="flex flex-col gap-4">

                  <div>
                    <p className="text-sm text-gray-600">Doctor name</p>
                    <input onChange={(e)=>setName(e.target.value)} value={name} className="w-full border border-gray-200 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-400" type="text" placeholder='Name' required />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Doctor email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className="w-full border border-gray-200 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-400" type="email" placeholder='Email' required />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Doctor password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} className="w-full border border-gray-200 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-400" type="password" placeholder='Password' required />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Experience</p>
                    <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="w-full border border-gray-200 rounded-md p-2 mt-1">
                      <option>1 Year</option>
                      <option>2 Year</option>
                      <option>3 Year</option>
                      <option>4 Year</option>
                      <option>5 Year</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Fees</p>
                    <input onChange={(e)=>setFees(e.target.value)} value={fees} className="w-full border border-gray-200 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-400" type="number" placeholder='Fees' required />
                  </div>

                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-4">

                  <div>
                    <p className="text-sm text-gray-600">Speciality</p>
                    <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className="w-full border border-gray-200 rounded-md p-2 mt-1">
                      <option>General physician</option>
                      <option>Gynecologist</option>
                      <option>Dermatologist</option>
                      <option>Pediatricians</option>
                      <option>Neurologist</option>
                      <option >Gastroenterologist</option>
                    </select>
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Education</p>
                    <input onChange={(e)=>setDegree(e.target.value)} value={degree} className="w-full border border-gray-200 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-400" type="text" placeholder='Education' required />
                  </div>

                  <div>
                    <p className="text-sm text-gray-600">Address</p>
                    <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className="w-full border border-gray-200 rounded-md p-2 mt-1" type="text" placeholder='Address 1' required />
                    <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className="w-full border border-gray-200 rounded-md p-2 mt-2" type="text" placeholder='Address 2' required />
                  </div>

                </div>

              </div>

              <div>
                <p className="text-sm text-gray-600">About Doctor</p>
                <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className="w-full border border-gray-200 rounded-md p-2 mt-1 focus:outline-none focus:ring-1 focus:ring-blue-400" rows={4} required />
              </div>

              <button type='submit' className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md text-sm transition w-fit">
                Add doctor
              </button>

            </div>

          </div>

        </div>

      </form>

    </div>
  )
}

export default AddDoctor