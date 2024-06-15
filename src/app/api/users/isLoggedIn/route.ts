import {NextRequest, NextResponse} from "next/server"

export async function GET(request: NextRequest) {
    try {
        const token = request.cookies.get("token")?.value || ""

        if(token) {
            return NextResponse.json({
                message: "User is Logged In!"
            }, {status: 200})
        }

        return NextResponse.json({
            message: "User is Unauthorized!"
        }, {status: 200})

    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {status: 500})
    }
}