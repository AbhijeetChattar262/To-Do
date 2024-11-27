import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

console.log(process.env.EMAIL_SERVICE);

export const EmailConfig = {
  SERVICE: process.env.EMAIL_SERVICE, // Default to Amazon if not set
  AZURE: {
    CONNECTION_STRING: process.env.AZURE_CONNECTION_STRING || "",
  },
  AMAZON: {
    HOST: process.env.AMAZON_SMTP_HOST || "email-smtp.eu-north-1.amazonaws.com",
    PORT: Number(process.env.AMAZON_SMTP_PORT) || 587,
    USER: process.env.AMAZON_SMTP_USER || "",
    PASS: process.env.AMAZON_SMTP_PASS || "",
  },
};
