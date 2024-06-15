import {NextRequest, NextResponse} from "next/server"
import jwt from "jsonwebtoken"

export async function getDataFromToken(response: NextRequest) {
    try {
        
        const token = response.cookies.get("token")?.value || ""
        const data: any = await jwt.verify(token, process.env.TOKEN_SECRET!)

        return data.id

    } catch (error: any) {
        return NextResponse.json({error: error.message})
    }
}