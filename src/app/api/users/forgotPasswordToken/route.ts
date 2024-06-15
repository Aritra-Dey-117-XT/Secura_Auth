import { connect } from "@/dbConfig/dbConfig";
import {NextRequest, NextResponse} from "next/server"
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {email} = reqBody

        const user = await User.findOne({email})
        if(!user) {
            return NextResponse.json({message: "User Not Found with Given Email!"}, {status: 404})
        }

        const userID = user._id.toString()

        await sendEmail({email, emailType: "RESET", userID})

        return NextResponse.json({
            message: "Token Generated and Sent Successfully!",
            success: true
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}