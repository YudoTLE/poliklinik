import mongoose, { Schema } from 'mongoose'

const TimeSlotSchema = new Schema({
    start: {
        hour: Number,
        minute: Number
    },
    end: {
        hour: Number,
        minute: Number
    },
    max_patient: Number
})

const TimeSlotModel = mongoose.models.TimeSlot || mongoose.model('TimeSlot', TimeSlotSchema, 'TimeSlot')

export default TimeSlotModel