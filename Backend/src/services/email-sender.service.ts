import { prepareEmail } from "../utils/prepareEmail";
import { EmailTransporterFactory } from "../config/email-transporter-factory";
import { EmailTransporter } from "./email-transporter.service";

class EmailSenderService {
  private transporter: EmailTransporter; // Correctly typed as EmailTransporter

  constructor() {
    // Initialize the transporter using the factory method
    this.transporter = EmailTransporterFactory.createTransporter();
  }

  async sendWelcomeEmail(username: string): Promise<boolean> {
    try {
      console.log(`Sending welcome email to: ${username}`);
      const emailTemplate = prepareEmail.welcomeEmail(username);
      return await this.transporter.sendEmail(
        username,
        emailTemplate.subject,
        emailTemplate.text,
        emailTemplate.html,
        emailTemplate.from
      );
    } catch (error) {
      console.error(`Error sending welcome email to ${username}:`, error);
      return false;
    }
  }

  async sendVerificationEmail(username: string,verificationLink: string): Promise<boolean> {
    try {
      console.log(`Sending verification email to: ${username}`);
      const emailTemplate = prepareEmail.verificationEmail(username,verificationLink);
      return await this.transporter.sendEmail(
        username,
        emailTemplate.subject,
        emailTemplate.text,
        emailTemplate.html,
        emailTemplate.from
      );
    } catch (error) {
      console.error(`Error sending verification email to ${username}:`, error);
      return false;
    }
  }
}

export default EmailSenderService;
