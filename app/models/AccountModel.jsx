import mongoose, { Schema } from 'mongoose'

const AccountSchema = new Schema({
    username: String,
    password: String,
    name: String,
    reservation: [{
        reservation_id: String,
        queue_number: Number
    }]
})

const AccountModel = mongoose.models.Account || mongoose.model('Account', AccountSchema, 'Account')

export default AccountModel