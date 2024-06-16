import Link from "next/link"
import User from "@/models/userModel"
import { connect } from "@/dbConfig/dbConfig"

connect()

export default async function UserProfile({params} : any) {

    const user = await User.findOne({ _id: params.id })

    return (
        
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">Profile Details</h1>
            <hr className="mb-6" />

            {user ? (
                <div>
                    <h2 className="text-2xl text-green-500 text-center mb-4">User Found</h2>

                    <div className="text-left space-y-2">
                        <p className="text-purple-500">ID: <span className="text-cyan-500">{decodeURIComponent(user._id)}</span></p>
                        <p className="text-purple-500">Username: <span className="text-cyan-500">{decodeURIComponent(user.username)}</span></p>
                        <p className="text-purple-500">Email: <span className="text-cyan-500">{decodeURIComponent(user.email)}</span></p>
                        <p className="text-purple-500">Verified: <span className="text-cyan-500">{decodeURIComponent(user.isVerified)}</span></p>
                        <p className="text-purple-500">Admin: <span className="text-cyan-500">{decodeURIComponent(user.isAdmin)}</span></p>
                    </div>
                </div>
            ) : (
                <h2 className="text-2xl text-red-500 text-center">User Not Found</h2>
            )}

            <div className="mt-6 text-center">
                <Link href="/profile" className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300">
                    Go Back To Profile
                </Link>
            </div>
        </div>
    </div>
    )
}
