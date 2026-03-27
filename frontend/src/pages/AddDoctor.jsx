import React, { useState } from 'react'

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    speciality: '',
    degree: '',
    experience: '',
    about: '',
    fees: '',
    addressLine1: '',
    addressLine2: ''
  })

  const [imageFile, setImageFile] = useState(null)

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!imageFile) return alert('Please select an image!')

    const data = new FormData()
    // Append all fields
    data.append('name', formData.name)
    data.append('email', formData.email)
    data.append('password', formData.password)
    data.append('speciality', formData.speciality)
    data.append('degree', formData.degree)
    data.append('experience', formData.experience)
    data.append('about', formData.about)
    data.append('fees', formData.fees)
    // Send address as JSON string
    data.append(
      'address',
      JSON.stringify({
        line1: formData.addressLine1,
        line2: formData.addressLine2
      })
    )
    data.append('image', imageFile) // must match multer.single('image')

    const token = localStorage.getItem('adminToken')

    try {
      const res = await fetch('http://localhost:5000/api/admin/add-doctor', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: data
      })
      const result = await res.json()
      alert(result.message)
    } catch (err) {
      console.error(err)
      alert('Something went wrong!')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-6 max-w-lg mx-auto">
      <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
      <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
      <input type="text" name="speciality" placeholder="Speciality" onChange={handleChange} required />
      <input type="text" name="degree" placeholder="Degree" onChange={handleChange} required />
      <input type="text" name="experience" placeholder="Experience" onChange={handleChange} required />
      <input type="text" name="about" placeholder="About" onChange={handleChange} required />
      <input type="number" name="fees" placeholder="Fees" onChange={handleChange} required />
      <input type="text" name="addressLine1" placeholder="Address Line 1" onChange={handleChange} required />
      <input type="text" name="addressLine2" placeholder="Address Line 2" onChange={handleChange} required />
      <input type="file" name="image" onChange={e => setImageFile(e.target.files[0])} required />
      <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Add Doctor</button>
    </form>
  )
}

export default AddDoctor