import AccountModel from '@/app/models/AccountModel'
import ConnectMongoDB from '@/app/libs/mongodb'
import { NextResponse } from 'next/server'
import { getSession } from '@/app/libs/server'

export const POST = async (req) => {
    try {
        await ConnectMongoDB()
        
        const { username, password } = await req.json()
        
        const account = await AccountModel.findOne({ username, password })
        if (!account) {
            return NextResponse.json(
                { message: 'Invalid username or password' },
                { status: 401 }
            )
        }

        const session = await getSession()
        session.username = username
        session.password = password
        session.isLoggedIn = true
        await session.save()

        return NextResponse.json(
            { message: 'Log in successful' },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { message: 'Internal Server Error' },
            { status: 500 }
        )
    }
}