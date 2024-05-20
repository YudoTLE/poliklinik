import TimeSlotModel from '@/app/models/TimeSlotModel'
import ConnectMongoDB from '@/app/libs/mongodb'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        await ConnectMongoDB()

        const timeSlot = await req.json()

        await TimeSlotModel.create(timeSlot)

        return NextResponse.json(
            { message: `Succesfully created new timeSlot` },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

export const GET = async () => {
    try {
        await ConnectMongoDB()

        const timeSlot = await TimeSlotModel.find()
        timeSlot.sort((a, b) => (a.hour * 60 + a.minute) - (b.hour * 60 + b.minute))

        return NextResponse.json(
            timeSlot,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}