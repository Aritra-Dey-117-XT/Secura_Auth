"use client"

import React, {useState, useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {toast} from "react-hot-toast"

export default function resetPasswordPage() {

    const userID = window.location.search.split("=")[1]

    const [password, setPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })

    const [newPasswordValidation, setNewPasswordValidation] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false
    })

    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(false)

    const [isTouched, setIsTouched] = useState({
        newPassword: false,
        confirmPassword: false
    });

    const [isNewPasswordTouched, setNewPasswordTouched] = useState(false)
    const [isConfirmPasswordTouched, setConfirmPasswordTouched] = useState(false)

    const handleNewPasswordChange = (event: any) => {
        const {value} = event.target
        setPassword({...password, newPassword: value})
        setNewPasswordValidation({
            length: value.length >= 8,
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            number: /\d/.test(value),
            special: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value)
        })
    }

    const handleConfirmPasswordChange = (event: any) => {
        const {value} = event.target
        setPassword({...password, confirmPassword: value})
        setConfirmPasswordValidation(document.getElementById("newPassword")?.value === document.getElementById("confirmPassword")?.value)
    }

    const handleFocus = (field: string) => {
        setIsTouched({ ...isTouched, [field]: true });
        if(field === "newPassword") {
            setNewPasswordTouched(true)
        } else if(field === "confirmPassword") {
            setConfirmPasswordTouched(true)
        }
    };

    const handleBlur = (field: string) => {
        setIsTouched({ ...isTouched, [field]: false });
    };

    const router = useRouter()
    const [isButtonDisabled, setButtonDisabled] = useState(true)
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if(password.currentPassword && password.newPassword && password.confirmPassword) {
            if(!(newPasswordValidation.length && newPasswordValidation.lowercase && newPasswordValidation.uppercase && newPasswordValidation.number && newPasswordValidation.special)) {
                setButtonDisabled(true)
            } else if(!confirmPasswordValidation) {
                setButtonDisabled(true)
            } else {
                setButtonDisabled(false)
            }
        } else {
            setButtonDisabled(true)
        }
    })

    const onResetPassword = async () => {
        try {

            setLoading(true)
            toast.dismiss()
            toast.loading("Loading...")
            const response = await axios.post("/api/users/resetPassword", {userID, ...password})
            console.log("Password Update Successful : ", response.data)
            toast.dismiss()
            toast.success("Password Updated Successfully!")
            router.push("/profile")

        } catch (error: any) {

            console.log("Reset Problem : ", error)
            toast.dismiss()
            toast.error(error.response.data.message)

        } finally {
            setLoading(false)
        }
    }

    return (

        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">{isLoading ? "Updating Password, Please Wait" : "Reset Password"}</h1>
                <hr className="mb-6" />

                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">Enter Your Current Password</label>
                <input
                    type="password"
                    name="currentPassword"
                    id="currentPassword"
                    value={password.currentPassword}
                    onChange={(event) => setPassword({ ...password, currentPassword: event.target.value })}
                    placeholder="Current Password"
                    required
                    autoComplete="off"
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />

                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    {
                        isNewPasswordTouched ? (
                            (!(newPasswordValidation.length && newPasswordValidation.lowercase && newPasswordValidation.uppercase && newPasswordValidation.number && newPasswordValidation.special)) ? 
                            (<span className="text-red-500 font-bold">New Password ❌</span>) :
                            (<span className="text-green-500 font-bold">New Password ✔️</span>)
                        ) : "New Password"
                    }
                </label>
                <input
                    type="password"
                    name="newPassword"
                    id="newPassword"
                    value={password.newPassword}
                    onChange={handleNewPasswordChange}
                    onFocus={() => handleFocus("newPassword")}
                    onBlur={() => handleBlur("newPassword")}
                    placeholder="New Password"
                    required
                    autoComplete="off"
                    className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                {isTouched.newPassword && (
                        <div id="message">
                            <p className={newPasswordValidation.length ? "valid" : "invalid"}>
                                {newPasswordValidation.length ? "✔️" : "❌"}Must Contain Atleast 8 Characters.
                            </p>
                            <p className={newPasswordValidation.lowercase ? "valid" : "invalid"}>
                                {newPasswordValidation.lowercase ? "✔️" : "❌"}Must Contain Atleast 1 LOWERCASE(a-z) Character.
                            </p>
                            <p className={newPasswordValidation.uppercase ? "valid" : "invalid"}>
                                {newPasswordValidation.uppercase ? "✔️" : "❌"}Must Contain Atleast 1 UPPERCASE(A-Z) Character.
                            </p>
                            <p className={newPasswordValidation.number ? "valid" : "invalid"}>
                                {newPasswordValidation.number ? "✔️" : "❌"}Must Contain Atleast 1 DIGIT(0-9).
                            </p>
                            <p className={newPasswordValidation.special ? "valid" : "invalid"}>
                                {newPasswordValidation.special ? "✔️" : "❌"}Must Contain Atleast 1 SPECIAL(!,",#,$,%,&,*,/,?,@ etc...) Character.
                            </p>
                        </div>
                    )}

                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    {
                        isConfirmPasswordTouched ? (
                            (!confirmPasswordValidation) ? (<span className="text-red-500 font-bold">Confirm New Password ❌</span>) :
                            (<span className="text-green-500 font-bold">Confirm New Password ✔️</span>)
                        ) : "Confirm New Password"
                    }
                </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={password.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="Confirm Password"
                    required
                    autoComplete="off"
                    className="mb-6 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                />
                {isTouched.confirmPassword && (
                    <div id="message">
                       <p className={confirmPasswordValidation ? "valid" : "invalid"}>
                            {confirmPasswordValidation ? "✔️" : "❌"}Must Be Equal to Password.
                        </p>
                    </div>
                )}
                <br />
                <button
                    type="submit"
                    className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                    onClick={onResetPassword}
                    disabled={isButtonDisabled}
                >
                    {isButtonDisabled ? "Data Required to Reset Password" : "Reset Password"}
                </button>

                <br />
                <Link href="/profile" className="block text-center mt-4 text-blue-500 hover:text-yellow-500">Go back to Profile</Link>
            </div>
        </div>
    )
}