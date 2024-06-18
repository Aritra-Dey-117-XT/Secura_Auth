import User from "@/models/userModel";
import nodemailer from "nodemailer"
import bcryptjs from 'bcryptjs';

export const sendEmail = async({email, emailType, userID}: any) => {
    try {
        const hashedToken = await bcryptjs.hash(userID.toString(), 12)
        
        if(emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + (5*60*1000),
            })
        } else if(emailType === "RESET") {
            await User.findByIdAndUpdate(userID, {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + (5*60*1000),
            })
        }

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: process.env.SECURA_AUTH_EMAIL,
                pass: process.env.SECURA_AUTH_APP_PASSWORD
            }
        });

        const verificationLink = emailType === "VERIFY" ? `${process.env.DOMAIN}/verifyemail?token=${hashedToken}` 
        : `${process.env.DOMAIN}/forgotpassword/verifytoken?token=${hashedToken}`
        
        let mailOptions = {
            from: process.env.SECURA_AUTH_EMAIL,
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
            html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
                <h2 style="color: #333; text-align: center;">${emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</h2>
                <p style="color: #555; font-size: 16px;">Hello Dear User,</p>
                <p style="color: #555; font-size: 16px;">
                    Please click the button below to ${emailType === "VERIFY" ? "verify your email address" : "reset your password"}. This link is valid for only <span style="color: red;">5 minutes</span>.
                </p>
                <div style="text-align: center; margin: 20px 0;">
                    <a href="${verificationLink}" style="background-color: #4CAF50; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px;">
                        ${emailType === "VERIFY" ? "Verify Email" : "Reset Password"}
                    </a>
                </div>
                <p style="color: #555; font-size: 16px;">
                    If the button above doesn't work, copy and paste the following link into your browser:
                </p>
                <p style="color: #007BFF; word-wrap: break-word;">
                    <a href="${verificationLink}" style="color: #007BFF;">${verificationLink}</a>
                </p>
                <p style="color: #555; font-size: 16px;">Thank you!</p>
                <p style="color: #555; font-size: 16px;">Best regards,<br>
                     <span style="
                        font-size: 1em; 
                        font-weight: bold; 
                        display: inline-block;
                        color: red;
                        animation: colorChange 3s infinite;
                        -webkit-animation: colorChange 3s infinite;
                    ">
                        Secura_Auth
                    </span>
                </p>
                <style>
                    @keyframes colorChange {
                        0% {
                            color: #ff3b30; /* Iron Man's red */
                        }
                        33% {
                            color: #ffcc00; /* Iron Man's gold */
                        }
                        66% {
                            color: #8c8c8c; /* Iron Man's silver/gray */
                        }
                        100% {
                            color: #ff3b30; /* Back to Iron Man's red */
                        }
                    }
                    @-webkit-keyframes colorChange { /* For Safari and Chrome */
                        0% {
                            color: #ff3b30; /* Iron Man's red */
                        }
                        33% {
                            color: #ffcc00; /* Iron Man's gold */
                        }
                        66% {
                            color: #8c8c8c; /* Iron Man's silver/gray */
                        }
                        100% {
                            color: #ff3b30; /* Back to Iron Man's red */
                        }
                    }
                </style>
                </p>
            </div>`
        };

        const mailResponse = await transporter.sendMail(mailOptions)
        return mailResponse

    } catch(error: any) {
        throw new Error(error.message)
    }

}
