"use client"

import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"
import React, {useState, useEffect} from "react"

interface UserData {
    _id: string
    username: string
    email: string
    isVerified: boolean
    isAdmin: boolean
}

export default function ProfilePage() {

    const router = useRouter()
    const [userData, setUserData] = useState<UserData | null>(null);

    useEffect(() => {

        if (userData) {
            router.push(`profile/${userData._id}`)
        }
    }, [userData])

    const getUserInfo = async () => {

        try {
            toast.dismiss()
            toast.loading("Loading...")
            const response = await axios.get("/api/users/me")
            const data = response.data.data
            toast.dismiss()
            toast.success("User Info Successfully Fetched!")
            setUserData(data)

        } catch (error: any) {
            toast.dismiss()
            toast.error("Error Fetching User Info")
        }
    }

    const onLogout = async () => {
        try {
            
            await axios.post("/api/users/logout")
            toast.success("User Logged Out Successfully!")
            router.push("/login")

        } catch (error: any) {
            toast.error(error.response.data.error)
        }
    }

    const goToResetPassword = async () => {
        try {
            const response = await axios.get("/api/users/me")
            const data = response.data.data
            router.push(`/resetpassword?id=${data._id}`)

        } catch (error) {
            toast.error("Error fetching user info")
        }
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Profile</h1>
            <hr className="mb-6" />

            <button 
                type="button"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg mb-4 transition duration-300"
                onClick={() => router.push("/")}
            >Go To Home</button>

            <button 
                type="button"
                className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg mb-4 transition duration-300"
                onClick={getUserInfo}
            >
                Get User Info
            </button>

            <button 
                type="button"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg mb-4 transition duration-300"
                onClick={goToResetPassword}
            >
                Reset Password
            </button>

            <button 
                type="button"
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
                onClick={onLogout}
            >
                Logout
            </button>
        </div>
    </div>
    )   
}