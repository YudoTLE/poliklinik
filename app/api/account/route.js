import AccountModel from '@/app/models/AccountModel'
import ConnectMongoDB from '@/app/libs/mongodb'
import { NextResponse } from 'next/server'

export async function GET()
{
    await ConnectMongoDB()

    const items = await AccountModel.find()

    return NextResponse.json(items)
}