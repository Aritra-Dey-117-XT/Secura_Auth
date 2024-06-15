"use client"

import {useRouter} from "next/navigation"
import Link from "next/link";
import {useState, useEffect} from 'react';
import styles from '../styles/Home.module.css';
import axios from "axios";
import toast from "react-hot-toast";

export default function Home() {

  const [userAuthorized, setUserAuthorized] = useState(false)

  const onLoad = async() => {
    // toast.dismiss()
    // toast.loading("Loading...", {duration: 500})
    const response = await axios.get("/api/users/isLoggedIn")
    if(response.data.message === "User is Logged In!") {
      setUserAuthorized(true)
      return;
    }
  }

  useEffect(() => {
    onLoad()
  })

  const Router = useRouter()

  const quotes = [
    "Security is not a product, but a process.",
    "Authentication is the first step to providing a secure experience.",
    "Privacy is not something that I’m merely entitled to, it’s an absolute prerequisite.",
    "The security of your data is our top priority.",
    "Trust but verify: a mantra for secure authentication.",
    "A strong password is the first line of defense.",
    "Without security, there is no privacy.",
    "Authentication is the gatekeeper of digital identity.",
    "Privacy and security are essential to maintaining trust.",
    "Protect your data like it's your most valuable asset.",
    "In the age of digital transformation, security and privacy are paramount.",
    "Your data, your identity, your privacy – protected at all costs.",
    "Security is about protecting the people as much as it is about protecting the data.",
    "Authentication should be strong yet seamless, ensuring both security and convenience.",
    "Privacy is the foundation of trust in the digital age."
  ];

  const [randomQuote, setRandomQuote] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
  }, []);

  return (
    <div className={styles.container}>

      <header className={styles.header}>
        <div className={styles.navbar}>
          <div className={styles.logo}>Secura_Auth</div>
          <div className={styles.authButtons}>
            <Link href="/about" className={styles.aboutLink}>About Page</Link>
            {!userAuthorized && (
              <>
                <button className={styles.loginButton} onClick={() => Router.push("/login")}>Log in</button>
                <button className={styles.signupButton} onClick={() => Router.push("/signup")}>Sign up</button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={`${styles.title} bigTitle`}>
          {randomQuote || "Welcome to Secure_Auth"}
        </h1>
        <p className={styles.description}>
          This is a Local Authentication App, Your Data is Highly Secured with Our Backend and Token Based Authorization, 
          made using Latest NextJS 14 and MongoDB.
        </p>
        <div className={styles.buttons}>
          {userAuthorized ? ( <button className={styles.primaryButton} onClick={() => Router.push("/profile")}>Go To Profile</button>) : 
          ( <button className={styles.primaryButton} onClick={() => Router.push("/signup")}>Get Startled</button>)}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>&copy; Aritra Dey, 2024. All rights reserved.</p>
      </footer>

    </div>
  );
}