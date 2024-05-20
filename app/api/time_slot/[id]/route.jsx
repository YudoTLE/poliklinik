import TimeSlotModel from '@/app/models/TimeSlotModel'
import ConnectMongoDB from '@/app/libs/mongodb'
import { NextResponse } from 'next/server'

export async function GET(req, { params })
{
    try {
        await ConnectMongoDB()

        const { id } = await params

        const timeSlot = await TimeSlotModel.findOne({ _id: id })

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