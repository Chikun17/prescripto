// 

import validator from 'validator'
import bcrypt from 'bcrypt'
import { v2 as cloudinary } from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, fees, address } = req.body
    const imageFile = req.file

    if (!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile) {
      return res.json({ success: false, message: "Missing details or image" })
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" })
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short" })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // Upload image to cloudinary
    const uploadedImage = await cloudinary.uploader.upload(imageFile.path, {
      folder: 'doctors',
      resource_type: 'image'
    })

    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      image: uploadedImage.secure_url,
      address: JSON.parse(address),
      date: Date.now()
    }

    const newDoctor = new doctorModel(doctorData)
    await newDoctor.save()

    res.json({ success: true, message: "Doctor added successfully" })
  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}

export { addDoctor }