import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from 'bcryptjs';

connect()

export async function POST(request: NextRequest) {
    try {
        
        const reqBody = await request.json()
        const {hashedUserID, newPassword, confirmPassword} = reqBody

        const users = await User.find();

        if (!users.length) {
            return NextResponse.json({
                message: "No Users In Database!"
            }, {status: 404})
        }

        let matchedUser = null

        for (let user of users) {
            const isMatch = await bcryptjs.compare(user._id.toString(), hashedUserID);
            if (isMatch) {
                console.log('ID matches for user:', user);
                matchedUser = user
            }
        }

        if(!matchedUser) {
            return NextResponse.json({
                message: "Invalid Id, User not Found!"
            }, {status: 404})
        }

        if(newPassword !== confirmPassword) {
            return NextResponse.json({
                message: "New Password Wasn't Confirmed!"
            }, {status: 406})
        }

        const salt = await bcryptjs.genSalt(12)
        const newHashedPassword = await bcryptjs.hash(newPassword, salt)
        matchedUser.password = newHashedPassword
        const updatedUser = await matchedUser.save()

        return NextResponse.json({
            message: "Password Updated Successfully",
            success: true
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}