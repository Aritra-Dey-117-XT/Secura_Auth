import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        console.log("reqBody:", reqBody)
        const {userID, currentPassword, newPassword, confirmPassword} = reqBody
        console.log(userID, currentPassword, newPassword, confirmPassword)

        const user = await User.findOne({_id: userID})
        console.log("user:", user)

        if(!user) {
            return NextResponse.json({message: "Error! Invalid User."}, {status: 401})
        }

        const hash = user.password
        const isValidPassword = await bcryptjs.compare(currentPassword, hash)

        if(isValidPassword) {
            if(newPassword === confirmPassword) {

                const salt = await bcryptjs.genSalt(12)
                const newHashedPassword = await bcryptjs.hash(newPassword, salt)
                user.password = newHashedPassword
                const updatedUser = await user.save()

                return NextResponse.json({
                    message: "Password Update Successful!",
                    success: true,
                    updatedUser
                }, {status: 200})
            } else {
                return NextResponse.json({message: "New Password didn't Match with Confirm Password!"}, {status: 406})
            }
        } else {
            return NextResponse.json({message: "Your Old Password Didn't Match, Please Enter Correct Password."}, {status: 401})
        }

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}