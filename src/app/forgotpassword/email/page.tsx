"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {toast} from "react-hot-toast"

export default function ForgotPasswordEmailPage() {

    const [email, setEmail] = useState({
        email: "",
    })

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if(email.email) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    })

    const onSendToken = async () => {
        try {

            setLoading(true)
            toast.dismiss()
            const loadingToast = toast.loading("Loading...")
            const response = await axios.post("/api/users/forgotPasswordToken", email)
            toast.dismiss()
            toast.success("A Reset link(Valid for 5 minutes) was sent to your Email. Check Your Email and Reset Your Password.", {duration: 6000})
            
        } catch (error: any) {

            toast.dismiss()
            toast.error(error.response.data.message)

        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
                {isLoading ? "Sending a Verification Token to Your Email" : "Reset Password"}
            </h1>
            <hr className="mb-6" />

            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Enter Email</label>
            <input
                type="text"
                name="email"
                id="email"
                value={email.email}
                onChange={(event) => setEmail({ email: event.target.value })}
                placeholder="Enter Email"
                required
                autoComplete="off"
                className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
            />

            <button
                type="submit"
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                onClick={onSendToken}
                disabled={isButtonDisabled}
            >
                {isButtonDisabled ? "Email Required to Reset" : "Send Verify Token"}
            </button>

            <br />
            <Link href="/login" className="block text-center mt-4 text-blue-500 hover:text-yellow-500">
                Go Back to Login Page
            </Link>
        </div>
    </div>
    )
}