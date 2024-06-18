import {connect} from "@/dbConfig/dbConfig"
import bcryptjs  from 'bcryptjs'
import User from "@/models/userModel"
import {NextRequest, NextResponse} from "next/server"
import jwt from "jsonwebtoken"
import { sendEmail } from "@/helpers/mailer"

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody
        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "User Does Not Exist, Please Sign Up!"}, {status: 404})
        }

        const hash = user.password
        const userAuthorised = await bcryptjs.compare(password, hash)

        if(!userAuthorised) {
            return NextResponse.json({
                error: "Wrong Password! Please Enter Correct Password.",
                success: false
            }, {status: 401})
        }

        if(!user.isVerified) {
            if(new Date(user.verifyTokenExpiry).getTime() < Date.now()) {
                const userID = user._id.toString()
                await sendEmail({email, emailType: "VERIFY", userID})
                return NextResponse.json({
                    error: "User Not Verified! A verification link(Valid for 5 minutes) was sent to your Email. Check Your Email and Verify before Logging In."
                }, {status: 400})
            }
            return NextResponse.json({error: "User Not Verified, Please Check Your Email and Verify before Logging In!"}, {status: 401})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "User Logged In Successfully!",
            success: true,
            user
        }, {status: 200})

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24,
            path: '/',
        });

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}