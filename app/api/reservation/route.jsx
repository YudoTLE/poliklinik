import ReservationModel from '@/app/models/ReservationModel'
import ConnectMongoDB from '@/app/libs/mongodb'
import { NextResponse } from 'next/server'

export const POST = async (req) => {
    try {
        await ConnectMongoDB()

        const { time_slot_id, date } = await req.json()

        await ReservationModel.create({
            time_slot_id,
            date,
            patient: []
        })

        return NextResponse.json(
            { message: `succesfully created new reservation` },
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

        const reservation = await ReservationModel.find()

        return NextResponse.json(
            reservation,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}