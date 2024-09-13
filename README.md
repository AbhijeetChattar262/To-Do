# Magic Software To Do App

## Description

This is a Todo App with a secure login system where users can register and log in. Todos are isolated for each user, allowing for personalized task management. The application is built using Node for the backend and React for the frontend.

## Features

- User registration and login
- Isolated todos for each user
- Add, edit, delete, and mark tasks as completed
- Responsive design using React-Bootstrap
- Typescript for type safety

## Tech Stack

- **Frontend:** React, React-Router, React-Bootstrap, sweetalert2
- **Backend:** Node.js, Express, Typescript, Bcrypt, JWT
- **Database:** MySQL

## Installation

### Backend

1. Navigate to the backend directory:

   ```bash
   cd backend

   ```

2. Install required packages:
   ```bash
   npm install
   ```

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install required packages:
   ```bash
   npm install
   ```

## Usage

### Running the Backend

1. Ensure that your MySQL server is running.
2. Update your database connection settings in `server.ts`.
3. Start the backend server:
   ```bash
   tsc src/server.ts
   node ./dist/server.js
   ```

### Running the Frontend

1. Navigate to the frontend directory (if not already there):
   ```bash
   cd frontend
   ```
2. Start the React application:
   ```bash
   npm start
   ```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
