"use client"

import React, { useState, useEffect } from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {toast} from "react-hot-toast"

export default function LoginPage() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const router = useRouter()
    const [isLoading, setLoading] = useState(false)
    const [isButtonDisabled, setButtonDisabled] = useState(true)

    useEffect(() => {
        if(user.email && user.password) {
            setButtonDisabled(false)
        } else {
            setButtonDisabled(true)
        }
    })

    const onLogin = async () => {
        try {

            setLoading(true)
            toast.dismiss()
            toast.loading("Loading...")
            const response = await axios.post("/api/users/login", user)
            console.log("User Successfully Logged In : ", response.data)
            toast.dismiss()
            toast.success("Login Successful!")
            router.push("/profile")
            
        } catch (error: any) {

            if(error.response.status == 400) {
                toast.dismiss()
            toast.error(error.response.data.error, {duration: 6000, style: {background: "yellow", color: "red"}})
            } else {
                console.log("Unable to Log In : ", error)
                toast.dismiss()
                toast.error(error.response.data.error)
            } 
        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">{ isLoading ? "Logging In, Please Wait" : "Log In"}</h1>
            <hr className="mb-6" />

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">Email</label>
                <input 
                    type="text" 
                    name="email" 
                    id="email"
                    value={user.email}
                    onChange={(event) => setUser({...user, email: event.target.value})}
                    placeholder="Enter Email"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">Password</label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={user.password}
                    onChange={(event) => setUser({...user, password: event.target.value})}
                    placeholder="Enter Password"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button 
                type="submit"
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onLogin}
                disabled={isButtonDisabled}
            >
                { isButtonDisabled ? "Data Required to Log In" : "Log In"}
            </button>

            <div className="mt-6 text-center">
                <Link href="/forgotpassword/email" className="text-blue-500 hover:text-red-500 transition duration-300">Forgot Password? Click Here to Reset</Link>
            </div>
            <div className="mt-4 text-center">
                <Link href="/signup" className="text-blue-500 hover:text-yellow-500 transition duration-300">Go To Signup Page</Link>
            </div>
            <div className="mt-4 text-center">
                <Link href="/" className="text-blue-500 hover:text-yellow-500 transition duration-300">Go To Home</Link>
            </div>
        </div>
    </div>
    )
}