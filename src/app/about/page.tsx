// pages/about.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import myPicture from '../../../public/me.jpg'; // Ensure you have this image in the public directory

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <header className="flex justify-end mb-8">
        <Link href="/">
          <p className="text-lg text-blue-600 hover:underline hover:text-green-500">Go To Home</p>
        </Link>
      </header>
      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-6 animate-fade-in">About Secura_Auth</h1>
        <p className="text-lg text-gray-700 leading-relaxed">
          Secura_Auth is an authentication web app built using the latest Next.js 14, MongoDB, and advanced data encryption techniques. We use cryptographic algorithms and robust security measures to ensure non-alien authentication, meaning we do not rely on third-party strategies such as Google or GitHub authentication. Various applications can be built on top of this authentication app, providing them with secure local authentication.
        </p>
      </section>

      <section className="mb-12">
        <h1 className="text-4xl font-bold text-center mb-6 animate-fade-in">About Me</h1>
        <div className="flex flex-col items-center">
          <Image
            src={myPicture}
            alt="Aritra Dey"
            className="rounded-full w-48 h-48 mb-6 shadow-lg"
          />
          <p className="text-lg text-gray-400 leading-relaxed text-center">
            I am Aritra Dey, a student at IIIT Kalyani, an INI in West Bengal, India. I am an enthusiast in web development, and this is my first Next.js app. Secura_Auth is an authentication app that I can use in my future projects.
          </p>
          <div className="flex justify-center mt-6 space-x-4">
            <Link href="https://linkedin.com/in/aritra-dey-14369b270" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.795-1.75-1.732s.784-1.732 1.75-1.732c.966 0 1.75.795 1.75 1.732s-.784 1.732-1.75 1.732zm13.5 12.268h-3v-5.604c0-1.334-.027-3.053-1.865-3.053-1.867 0-2.154 1.457-2.154 2.961v5.696h-3v-11h2.884v1.501h.041c.401-.759 1.379-1.561 2.835-1.561 3.029 0 3.591 1.994 3.591 4.585v6.475z"/>
                </svg>
              </p>
            </Link>
            <Link href="https://github.com/Aritra-Dey-117-XT" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="GitHub">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.725-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.086-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.997.108-.775.418-1.305.76-1.605-2.665-.305-5.466-1.332-5.466-5.93 0-1.31.467-2.382 1.236-3.222-.124-.304-.535-1.527.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.005-.404 1.022.005 2.048.138 3.006.404 2.291-1.552 3.298-1.23 3.298-1.23.653 1.649.242 2.872.118 3.176.77.84 1.236 1.912 1.236 3.222 0 4.61-2.804 5.624-5.476 5.921.43.371.812 1.102.812 2.222 0 1.606-.014 2.898-.014 3.293 0 .32.218.694.825.576 4.765-1.589 8.201-6.086 8.201-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </p>
            </Link>
            <Link href="https://x.com/Arivenger117" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="X">
                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 50 50">
                <path d="M 5.9199219 6 L 20.582031 27.375 L 6.2304688 44 L 9.4101562 44 L 21.986328 29.421875 L 31.986328 44 L 44 44 L 28.681641 21.669922 L 42.199219 6 L 39.029297 6 L 27.275391 19.617188 L 17.933594 6 L 5.9199219 6 z M 9.7167969 8 L 16.880859 8 L 40.203125 42 L 33.039062 42 L 9.7167969 8 z"></path>
                </svg>
              </p>
            </Link>
            <Link href="mailto:aritradey2715@gmail.com" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="Gmail">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 13.065l-12-7.065v13c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-13l-12 7.065zm12-10.065v-.935c0-1.104-.896-2-2-2h-20c-1.104 0-2 .896-2 2v.935l12 7.065 12-7.065z"/>
                </svg>
              </p>
            </Link>
            <Link href="https://www.instagram.com/arivenger11747/" target="_blank" rel="noopener noreferrer">
              <p className="svg-icon" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.17.054 1.97.24 2.417.406a4.92 4.92 0 0 1 1.754 1.022 4.92 4.92 0 0 1 1.022 1.754c.166.447.352 1.247.406 2.417.058 1.265.069 1.645.069 4.849 0 3.204-.012 3.584-.07 4.849-.054 1.17-.24 1.97-.406 2.417a4.908 4.908 0 0 1-1.022 1.754 4.922 4.922 0 0 1-1.754 1.022c-.447.166-1.247.352-2.417.406-1.265.058-1.645.069-4.849.069-3.204 0-3.584-.012-4.849-.07-1.17-.054-1.97-.24-2.417-.406a4.92 4.92 0 0 1-1.754-1.022 4.92 4.92 0 0 1-1.022-1.754c-.166-.447-.352-1.247-.406-2.417-.058-1.265-.069-1.645-.069-4.849 0-3.204.012-3.584.07-4.849.054-1.17.24-1.97.406-2.417a4.92 4.92 0 0 1 1.022-1.754 4.92 4.92 0 0 1 1.754-1.022c.447-.166 1.247-.352 2.417-.406 1.265-.058 1.645-.069 4.849-.069zm0-2.163c-3.261 0-3.667.012-4.947.071-1.28.059-2.162.26-2.918.555a6.92 6.92 0 0 0-2.519 1.641 6.923 6.923 0 0 0-1.641 2.519c-.295.756-.496 1.638-.555 2.918-.059 1.28-.071 1.686-.071 4.947s.012 3.667.071 4.947c.059 1.28.26 2.162.555 2.918a6.92 6.92 0 0 0 1.641 2.519 6.92 6.92 0 0 0 2.519 1.641c.756.295 1.638.496 2.918.555 1.28.059 1.686.071 4.947.071s3.667-.012 4.947-.071c1.28-.059 2.162-.26 2.918-.555a6.922 6.922 0 0 0 2.519-1.641 6.92 6.92 0 0 0 1.641-2.519c.295-.756.496-1.638.555-2.918.059-1.28.071-1.686.071-4.947s-.012-3.667-.071-4.947c-.059-1.28-.26-2.162-.555-2.918a6.92 6.92 0 0 0-1.641-2.519 6.92 6.92 0 0 0-2.519-1.641c-.756-.295-1.638-.496-2.918-.555-1.28-.059-1.686-.071-4.947-.071zm0 5.838a6.163 6.163 0 1 0 0 12.327 6.163 6.163 0 0 0 0-12.327zm0 10.327a4.163 4.163 0 1 1 0-8.327 4.163 4.163 0 0 1 0 8.327zm6.406-11.845a1.44 1.44 0 1 1 0-2.881 1.44 1.44 0 0 1 0 2.881z"/>
                </svg>
              </p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
