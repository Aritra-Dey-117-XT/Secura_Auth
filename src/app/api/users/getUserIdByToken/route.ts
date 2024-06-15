import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {token} = reqBody

        const user = await User.findOne({$or: [
            {verifyToken: token},
            {forgotPasswordToken: token}
        ]})

        if(!user) {
            return NextResponse.json({
                message: "Invalid Token, User Not Found!"
            }, {status: 404})
        }

        const userID = user._id.toString()
        const hashedUserID = await bcryptjs.hash(userID, 12)

        return NextResponse.json({
            message: "Successfully Found User!",
            success: true,
            hashedUserID
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})        
    }
}