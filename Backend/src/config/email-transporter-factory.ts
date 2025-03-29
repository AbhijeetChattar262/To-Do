import { EmailConfig } from "../config/EmailConfig";
import { AzureEmailTransporter,AmazonSesEmailTransporter } from "../services/email-transporter.service";

export class EmailTransporterFactory {
  static createTransporter() {
    switch (EmailConfig.SERVICE) {
      case "azure":
        return new AzureEmailTransporter();
      case "amazon":
        return new AmazonSesEmailTransporter();
      default:
        throw new Error("Unsupported email service");
    }
  }
}
