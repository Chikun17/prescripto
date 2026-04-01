import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {   // ✅ FIXED
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {   // ✅ FIXED
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    available: {   // ✅ FIXED
        type: Boolean,
        default: true
    },
    fees: {   // ✅ FIXED
        type: Number,
        required: true
    },
    address: {
        type: Object,
        required: true
    },
    date: {
        type: Number,
        required: true
    },
    slots_booked: {
        type: Object,
        default: {}
    },
}, { minimize: false })

// ✅ IMPORTANT FIX (remove cache issue)
const doctorModel = mongoose.model('doctor', doctorSchema)

export default doctorModel