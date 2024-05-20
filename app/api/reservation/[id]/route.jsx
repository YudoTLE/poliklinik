import ReservationModel from '@/app/models/ReservationModel'
import ConnectMongoDB from '@/app/libs/mongodb'
import { NextResponse } from 'next/server'

export async function GET(req, { params })
{
    try {
        await ConnectMongoDB()

        const { id } = await params

        const reservation = await ReservationModel.findOne({ _id: id })

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

export async function PUT(req, { params })
{
    try {
        await ConnectMongoDB()

        const { username } = await req.json()
        const { id } = await params

        const item = await ReservationModel.findOne({ _id: id })
        item.patient.push({ username })
        await item.save()

        return NextResponse.json(
            { message: `Added ${ username }` },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}