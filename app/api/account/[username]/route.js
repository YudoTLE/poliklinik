import AccountModel from '@/app/models/AccountModel'
import ConnectMongoDB from '@/app/libs/mongodb'
import { getSession } from '@/app/libs/server'
import { NextResponse } from 'next/server'

export const GET = async (req, { params }) => {
    try {
        await ConnectMongoDB()
        
        const { username } = params
        
        const account = await AccountModel.findOne({ username })
        if (!account) {
            return NextResponse.json(
                { message: 'Invalid username' },
                { status: 401 }
            )
        }

        return NextResponse.json(
            account,
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}

export const PUT = async (req, { params }) => {
    try {
        await ConnectMongoDB()

        const { username } = await params
        const { reservation_id, queue_number } = await req.json()

        const account = await AccountModel.findOne({ username })
        account.reservation.push({
            reservation_id,
            queue_number
        })
        await account.save()

        return NextResponse.json(
            { message: 'Reservation successful' },
            { status: 201 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}