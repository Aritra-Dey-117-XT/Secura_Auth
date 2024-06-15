import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import {connect} from "@/dbConfig/dbConfig"

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: {$gt: Date.now()},
        })

        if(!user) {
            return NextResponse.json({
                error: "Token Expired or Invalid!",
            }, {status: 400})
        }

        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({
            message: "Email Verification Successful",
            success: true
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message || "Bad Request!"}, {status: 500})
    }
}