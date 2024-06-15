import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({
            forgotPasswordToken: token,
            forgotPasswordTokenExpiry: {$gt: Date.now()}
        })

        if(!user) {
            return NextResponse.json({
                message: "Error, Invalid Token!",
            }, {status: 404})
        }

        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "User Verified Successfully!",
            success: true
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}