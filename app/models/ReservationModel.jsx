import mongoose, { Schema } from 'mongoose'

const ReservationSchema = new Schema({
    time_slot_id: String,
    date: Date,
    patient: [{
        username: String
    }]
})

const ReservationModel = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema, 'Reservation')

export default ReservationModel