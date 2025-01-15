# Magic Software To Do App

## Description

This is a ToDo App with a secure login system where users can register and log in. Todos are isolated for each user, allowing for personalized task management. The application is built using **ts-node** for the backend and React for the frontend. The app is compatible with multiple databases (MSSQL, MySQL, PostgreSQL) using Prisma as the ORM.

## Features

- User registration and login
- Isolated todos for each user
- Add, edit, delete, and mark tasks as completed
- Responsive design using React-Bootstrap
- Typescript for type safety
- **Prisma adapter** for database management
- **Database compatibility** with **MSSQL**, **MySQL**, and **PostgreSQL**

## Tech Stack

- **Frontend:** React, React-Router, React-Bootstrap, sweetalert2
- **Backend:** ts-node, Express, Typescript, Prisma, Bcrypt, JWT
- **Database:** MSSQL (Primary), MySQL, PostgreSQL (compatible)

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

3. Set up Prisma:
    ```bash
    npx prisma generate
    ```

5. Change the `prisma.config.ts` file and set the appropriate connection URL:
    ```typescript
    import dotenv from 'dotenv';

    dotenv.config();

    const DATABASE_CONNECTION_URL = `sqlserver://${process.env.DB_HOST};database=${process.env.DB_NAME};user=${process.env.DB_USER};password=${process.env.DB_PASSWORD};encrypt=true;trustServerCertificate=true`;

    export { DATABASE_CONNECTION_URL };
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



## Database Configuration

To configure the database for MSSQL, MySQL, or PostgreSQL, modify the connection URL in your `.env` file as follows:

```env
# For MSSQL
DATABASE_URL="sqlserver://DB_HOST;database=DB_NAME;user=DB_USER;DB_PASSWORD;encrypt=true;trustServerCertificate=true"

# For MySQL
# DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# For PostgreSQL
# DATABASE_URL="postgresql://user_name:pass@DB_HOST/DB_NAME"
```
Example .env File
Create a .env file in the root of your backend directory with the following content:
```
DB_HOST=your_host
DB_NAME=your_database
DB_USER=your_user
DB_PASSWORD=your_password
PORT=5000
```
# Running the Application
### Running the Backend

1. Ensure that your MSSQL server is running.
2. Update your database connection settings in `prisma.config.ts`.
3. Start the backend server:
   ```bash
   npm run dev
   ```

### Running the Frontend

1. Navigate to the frontend directory (if not already there):
   ```bash
   cd frontend
   ```
2. Start the React application:
   ```bash
   npm run dev
   ```

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License.
