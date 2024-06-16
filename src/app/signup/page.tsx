"use client"
import React, {useState, useEffect} from "react"
import axios from "axios"
import {useRouter} from "next/navigation"
import Link from "next/link"
import {toast} from "react-hot-toast"

export default function SignupPage() {

    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const [usernameValidation, setUsernameValidation] = useState({
        length: false,
        whiteSpace: false
    })

    const [passwordValidation, setPasswordValidation] = useState({
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false
    })

    const [emailValidation, setEmailValidation] = useState({pattern: false})
    const [confirmPasswordValidation, setConfirmPasswordValidation] = useState(false)

    const [isTouched, setIsTouched] = useState({
        username: false,
        email: false,
        password: false,
        confirmPassword: false
    });

    const [isUsernameTouched, setUsernameTouched] = useState(false)
    const [isPasswordTouched, setPasswordTouched] = useState(false)
    const [isEmailTouched, setEmailTouched] = useState(false)
    const [isConfirmPasswordTouched, setConfirmPasswordTouched] = useState(false)

    const handleUsernameChange = (event: any) => {
        const {value} = event.target
        setUser({...user, username: value})
        setUsernameValidation({
            length: value.length >= 3 && value.length <= 20,
            whiteSpace: /\s/.test(value)
        })
    }

    const handleEmailChange = (event: any) => {
        const {value} = event.target
        setUser({...user, email: value})
        setEmailValidation({
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
        })
    }

    const handlePasswordChange = (event: any) => {
        const {value} = event.target
        setUser({...user, password: value})
        setPasswordValidation({
            length: value.length >= 8,
            lowercase: /[a-z]/.test(value),
            uppercase: /[A-Z]/.test(value),
            number: /\d/.test(value),
            special: /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/.test(value)
        })
    }

    const handleConfirmPasswordChange = (event: any) => {
        const {value} = event.target
        setUser({...user, confirmPassword: value})
        setConfirmPasswordValidation(document.getElementById("password")?.value === document.getElementById("confirmPassword")?.value)
    }

    const handleFocus = (field: string) => {
        setIsTouched({ ...isTouched, [field]: true });
        if(field === "username") {
            setUsernameTouched(true)
        } else if(field === "email") {
            setEmailTouched(true)
        } else if(field === "password") {
            setPasswordTouched(true)
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
        if(user.username && user.email && user.password && user.confirmPassword) {
            if(!usernameValidation.length || usernameValidation.whiteSpace) {
                setButtonDisabled(true)
            } else if(!emailValidation.pattern) {
                setButtonDisabled(true)
            } else if(!(passwordValidation.length && passwordValidation.lowercase && passwordValidation.uppercase && passwordValidation.number && passwordValidation.special)) {
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

    const onSignup = async () => {
        try {

            setLoading(true)
            toast.dismiss()
            toast.loading("Loading...")
            const response = await axios.post("/api/users/signup", user)
            console.log("User Successfully Registered : ", response.data)
            toast.dismiss()
            toast.success("User Successfully Registered! A verification link(Valid for 5 minutes) was sent to your Email. Check Your Email and Verify before Logging In.", {duration: 6000})
            router.push("/login")

        } catch (error: any) {

            console.log("Signup Problem : ", error)
            toast.dismiss()
            toast.error(error.response.data.error)

        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">{ isLoading ? "Signing Up, Please Wait" : "Sign Up"}</h1>
            <hr className="mb-6" />

            <div className="mb-4 relative">
                    <label htmlFor="username" className="block text-gray-600 font-semibold mb-2">
                        {
                            isUsernameTouched ? (
                                (!usernameValidation.length || usernameValidation.whiteSpace) ? (<span className="text-red-500 font-bold">Username ❌</span>) :
                                (<span className="text-green-500 font-bold">Username ✔️</span>)
                            ) : "Username"
                        }
                    </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={user.username}
                        onChange={handleUsernameChange}
                        onFocus={() => handleFocus("username")}
                        onBlur={() => handleBlur("username")}
                        placeholder="Enter Username"
                        required
                        autoComplete="off"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {isTouched.username && (
                        <div id="message">
                            <p className={usernameValidation.length ? "valid" : "invalid"}>
                                {usernameValidation.length ? "✔️" : "❌"}Minimum 3 Characters and Maximum 20 Characters.
                            </p>
                            <p className={!usernameValidation.whiteSpace ? "valid" : "invalid"}>
                                {usernameValidation.whiteSpace ? "❌" : "✔️"}Must Not Include a White Space.
                            </p>
                        </div>
                    )}
                </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-600 font-semibold mb-2">
                {
                    isEmailTouched ? (
                        (!emailValidation.pattern) ? 
                        (<span className="text-red-500 font-bold">Email ❌</span>) :
                        (<span className="text-green-500 font-bold">Email ✔️</span>)
                    ) : "Email"
                    }
                </label>
                <input 
                    type="text" 
                    name="email" 
                    id="email"
                    value={user.email}
                    onChange={handleEmailChange}
                    onFocus={() => handleFocus("email")}
                    onBlur={() => handleBlur("email")}
                    placeholder="Enter Email"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isTouched.email && (
                    <div id="message">
                        <p className={emailValidation.pattern ? "valid" : "invalid"}>
                            {emailValidation.pattern ? "✔️" : "❌"}Must be a Valid Email Id.
                        </p>
                    </div>
                )}
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-gray-600 font-semibold mb-2">
                    {
                        isPasswordTouched ? (
                            (!(passwordValidation.length && passwordValidation.lowercase && passwordValidation.uppercase && passwordValidation.number && passwordValidation.special)) ? 
                            (<span className="text-red-500 font-bold">Password ❌</span>) :
                            (<span className="text-green-500 font-bold">Password ✔️</span>)
                        ) : "Password"
                    }
                </label>
                <input 
                    type="password" 
                    name="password" 
                    id="password"
                    value={user.password}
                    onChange={handlePasswordChange}
                    onFocus={() => handleFocus("password")}
                    onBlur={() => handleBlur("password")}
                    placeholder="Enter Password"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isTouched.password && (
                        <div id="message">
                            <p className={passwordValidation.length ? "valid" : "invalid"}>
                                {passwordValidation.length ? "✔️" : "❌"}Must Contain Atleast 8 Characters.
                            </p>
                            <p className={passwordValidation.lowercase ? "valid" : "invalid"}>
                                {passwordValidation.lowercase ? "✔️" : "❌"}Must Contain Atleast 1 LOWERCASE(a-z) Character.
                            </p>
                            <p className={passwordValidation.uppercase ? "valid" : "invalid"}>
                                {passwordValidation.uppercase ? "✔️" : "❌"}Must Contain Atleast 1 UPPERCASE(A-Z) Character.
                            </p>
                            <p className={passwordValidation.number ? "valid" : "invalid"}>
                                {passwordValidation.number ? "✔️" : "❌"}Must Contain Atleast 1 DIGIT(0-9).
                            </p>
                            <p className={passwordValidation.special ? "valid" : "invalid"}>
                                {passwordValidation.special ? "✔️" : "❌"}Must Contain Atleast 1 SPECIAL(!,",#,$,%,&,*,/,?,@ etc...) Character.
                            </p>
                        </div>
                    )}
            </div>

            <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-600 font-semibold mb-2">
                {
                    isConfirmPasswordTouched ? (
                        (!confirmPasswordValidation) ? (<span className="text-red-500 font-bold">Confirm Password ❌</span>) :
                        (<span className="text-green-500 font-bold">Confirm Password ✔️</span>)
                    ) : "Confirm Password"
                }
                </label>
                <input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    onFocus={() => handleFocus("confirmPassword")}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="Re-Enter Password"
                    required
                    autoComplete="off"
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {isTouched.confirmPassword && (
                    <div id="message">
                       <p className={confirmPasswordValidation ? "valid" : "invalid"}>
                            {confirmPasswordValidation ? "✔️" : "❌"}Must Be Equal to Password.
                        </p>
                    </div>
                )}
            </div>

            <button 
                type="submit"
                className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ${isButtonDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={onSignup}
                disabled={isButtonDisabled}
            >
                {isButtonDisabled ? "Valid Data Required to Sign Up" : "Sign Up"}
            </button>

            <div className="mt-6 text-center">
                <Link href="/login" className="text-blue-500 hover:text-yellow-700 transition duration-300">Go To Login Page</Link>
            </div>
            <div className="mt-6 text-center">
                <Link href="/" className="text-blue-500 hover:text-yellow-700 transition duration-300">Go To Home</Link>
            </div>
        </div>
    </div>
    )
}