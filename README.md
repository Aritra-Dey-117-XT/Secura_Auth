# Secura_Auth

Secura_Auth is an authentication web app built using the latest Next.js 14, MongoDB, and advanced data encryption techniques. We use cryptographic algorithms and robust security measures to ensure non-alien authentication, meaning we do not rely on third-party strategies such as Google or GitHub authentication. Various applications can be built on top of this authentication app, providing them with secure local authentication.

## Features

- **Secure Authentication**: Implementing industry-standard security measures to protect user accounts.
- **User Profiles**: Manage user profiles securely with customizable fields.
- **Password Management**: Secure storage and encryption of passwords.
- **Session Management**: Efficient session handling with built-in security mechanisms.

## Technologies Used

- **Next.js**: Framework for building React applications with server-side rendering.
- **React**: Frontend library for building user interfaces.
- **Node.js**: JavaScript runtime environment for server-side logic.
- **Express**: Web framework for Node.js for building APIs.
- **MongoDB**: NoSQL database for storing application data.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/Secura_Auth.git
   cd Secura_Auth

2. **Install dependencies:**

   ```bash
   npm install

3. **Set up environment variables:**

Create a .env file in the root directory and add the following variables:

   ```bash
   # Example .env file

MONGODB_URI=<your_mongodb_uri>
TOKEN_SECRET=<token_secret>
DOMAIN=<your_domain> # like for port 3000 in local server: "http://localhost:3000"
# MAILTRAP #
MAILTRAP_USER=<your_mailtrap_userid>
MAILTRAP_PASSWORD=<your_mailtrap_password>
```

4. **Run the application:**

   ```bash
   npm run dev
   ```

The application will be running at http://localhost:3000.

## Usage

- **User Registration:** Provide a secure registration process for new users.
- **Login:** Authenticate users securely using encrypted credentials.
- **Profile Management:** Allow users to update their profiles securely.
- **Session Handling:** Manage user sessions with secure token-based authentication.

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. Create your feature branch: `git checkout -b feature/new-feature`.
3. Commit your changes: `git commit -am 'Add new feature'`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Submit a pull request.

## Acknowledgments

- Thanks to Hitesh Choudhary and ChatGPT(OpenAI) for inspiration and Help.