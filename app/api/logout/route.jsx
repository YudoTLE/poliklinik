import { NextResponse } from 'next/server'
import ConnectMongoDB from '@/app/libs/mongodb'
import { getSession } from '@/app/libs/server'
import AccountModel from '@/app/models/AccountModel'

export const POST = async (req) => {
    try {
        const session = await getSession()
        if (session.isLoggedIn === false)
        {
            return NextResponse.json(
                { message: 'Already Logged Out' },
                { status: 401 }
            )
        }
        delete session.username
        delete session.password
        session.isLoggedIn = false
        await session.save()

        return NextResponse.json(
            { message: 'Log out successful' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}