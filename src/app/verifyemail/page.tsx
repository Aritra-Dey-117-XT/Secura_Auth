"use client"

import axios from "axios"
import {useEffect, useState} from "react"
import Link from "next/link"
import {toast} from "react-hot-toast"

export default function VerifyEmailPage() {

    const [token, setToken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, setError] = useState(false)

    const verifyUserEmail = async () => {
        try {
            toast.dismiss()
            toast.loading("Loading...")
            await axios.post("/api/users/verifyEmail", {token})
            setVerified(true)
            toast.dismiss()
            toast.success("User Verification Successful! Please Head to Login Now!")
        } catch (error: any) {
            setError(true)
            console.log(error.response.data)
            toast.dismiss()
            toast.error(error.response.data.error || "User Already Verified!")
        }
    }

    useEffect(() => {
        let urlToken = "" 
        if (typeof window !== 'undefined') {
            urlToken = window.location.search.split("=")[1]
        }
        setToken(urlToken || "")
    }, [])

    useEffect(() => {
        if(token) {
            verifyUserEmail()
        }
    }, [token])


    return(

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Verify Email</h1>

            <div className="text-center mb-4">
                <span className="text-xl font-bold text-red-500">VERIFY TOKEN:</span>
                <br />
                <span className={`text-xl ${token ? 'text-purple-500' : 'text-orange-500'} break-words ml-2`}>
                    {token ? token : 'No Token'}
                </span>
            </div>

            {verified && (
                <div className="text-center">
                    <h2 className="text-xl text-green-500 font-bold mb-4 animate-bounce">Email Verified</h2>
                    <Link href="/login" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                        Go To Login
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