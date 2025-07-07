# DevTinder Backend

This is the backend server for the DevTinder platform, a developer matchmaking and collaboration application. It is built with Node.js, Express, MongoDB, and Socket.io.

## Features

- User authentication (signup, login, logout) with JWT and cookies
- Profile management (view and update)
- Developer connection requests (send, review, save, ignore)
- Real-time chat between users (Socket.io)
- Email notifications for new signups (AWS SES)
- RESTful API endpoints for all core features


## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB database (Atlas or local)
- AWS SES credentials for email notifications

### Installation

1. Clone the repository and navigate to the backend folder:

    ```sh
    git clone <repo-url>
    cd devTinder_backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the root of `devTinder_backend` with the following variables:

    ```
    -uriDB_URI=<your-mongodb>
    JWT_SECRET=<your-jwt-secret>
    AWS_SES_ACCESS_KEY=<your-aws-access-key>
    AWS_SES_SECRET_KEY=<your-aws-secret-key>
    ```

4. Start the development server:

    ```sh
    npm run dev
    ```

    The server will run on `http://localhost:3000`.

## API Endpoints

- **Auth:** `/auth/signup`, `/auth/login`, `/auth/logout`
- **Profile:** `/profile/view`, `/profile/update`
- **User:** `/user/requests/received`, `/user/connections`, `/user/feed`, `/user/saved`
- **Request:** `/request/send/:status/:receiverId`, `/request/review/:status/:requestId`
- **Chat:** `/chat/all`, `/chat/initialize/:targetUserId`, `/chat/:targetUserId`

All protected routes require authentication via the [devTinderToken](http://_vscodecontentref_/22) cookie.

## Real-Time Chat

- Socket.io is initialized in [socket.js](http://_vscodecontentref_/23).
- The server supports real-time messaging, typing indicators, and online user tracking.


**Note:** For production, make sure to secure your environment variables and update CORS settings as needed.
