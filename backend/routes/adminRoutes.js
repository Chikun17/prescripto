// 

import express from 'express'
import { addDoctor } from '../controllers/adminController.js'
import upload from '../middlewares/multer.js'
import authAdmin from '../middlewares/authAdmin.js'

const router = express.Router()

// Note: 'image' must match the frontend field name
router.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)

export default router