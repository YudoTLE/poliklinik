import mongoose from 'mongoose'

const ConnectMongoDB = () => {
    try
    {
        mongoose.connect(process.env.MONGODB_URI)

        console.log('Database succesfully connected')
    }
    catch(e)
    {
        console.log('Failed to connect to database')
    }
}

export default ConnectMongoDB