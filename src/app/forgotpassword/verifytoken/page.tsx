"use client"

import {useEffect, useState} from "react"
import axios from "axios"
import Link from "next/link"
import {toast} from "react-hot-toast"

export default function VerifyForgotPasswordTokenPage() {

    const [hashedUserID, setHashedUserID] = useState("")
    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyToken = async() => {
        try {
            toast.dismiss()
            toast.loading("Loading...")
            const response = await axios.post("/api/users/getUserIdByToken", {token})
            const userID = response.data.hashedUserID
            setHashedUserID(userID)
            await axios.post("/api/users/verifyForgotToken", {token})
            setVerified(true)
            toast.dismiss()
            toast.success("You are Verified! Now Reset Your Password.")
        } catch (error: any) {
            setError(true)
            console.log("Error During Verifying ", error)
            toast.dismiss()
            toast.error(error.response.data.error || "Link Expired!")
        }
    }

    useEffect(() => {
        let token = ""
        if (typeof window !== 'undefined') {
            token = window.location.search.split("=")[1]
        }
        setToken(token || "")
    }, [])

    useEffect(() => {
        if(token) {
            verifyToken()
        }
    }, [token])

    return(

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Verify Email</h1>

                <div className="text-center mb-4">
                    <span className="text-xl font-bold text-red-500">RESET TOKEN:</span>
                    <br />
                    <span className={`text-xl ${token ? 'text-purple-500' : 'text-orange-500'} break-words ml-2`}>
                        {token ? token : 'No Token'}
                    </span>
                </div>

                {verified && (
                    <div className="text-center">
                        <h2 className="text-xl text-green-500 font-bold mb-4 animate-bounce">Email Verified</h2>
                        <Link href={`/forgotpassword/reset?id=${hashedUserID}`} className="inline-block bg-blue-500 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                            Continue With Reset Password
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="text-center mt-4">
                        <h2 className="text-xl text-red-500">{error}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}