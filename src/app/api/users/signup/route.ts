import {connect} from "@/dbConfig/dbConfig"
import { sendEmail } from "@/helpers/mailer"
import User from "@/models/userModel"
import bcryptjs from "bcryptjs"
import { NextRequest, NextResponse } from "next/server"

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {username, email, password, confirmPassword} = reqBody
        const user = await User.findOne({email})

        if(user) {
            return NextResponse.json({error: "User Already Exists, Please Log In"}, {status: 409})
        }

        if(password !== confirmPassword) {
            return NextResponse.json({error: "Your Password didn't match with Confirm Password"}, {status: 401})
        }

        const usernames = await User.findOne({username})
        if(usernames) {
            return NextResponse.json({error: "Username is Already Taken, Please use Anoher One!"}, {status: 409})
        }
        
        const salt = await bcryptjs.genSalt(12)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = await new User({
            username: username,
            email: email,
            password: hashedPassword
        })

        const savedUser = await newUser.save()

        try {
            await sendEmail({email, emailType: "VERIFY", userID: savedUser._id})
        } catch (error: any) {

            try {
                await User.deleteOne({_id: savedUser._id})
            } catch (error: any) {
                return NextResponse.json({error: error.message}, {status: 500})
            }
            
            return NextResponse.json({error: error.message}, {status: 404})
        }

        return NextResponse.json({
            message: "User Registered Succesfully",
            success: true,
            savedUser
        },
        {status: 201}
    )
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}