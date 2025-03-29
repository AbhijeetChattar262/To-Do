import { EmailConfig } from "../config/EmailConfig";
import { EmailClient } from "@azure/communication-email";
import * as nodemailer from "nodemailer";

export abstract class EmailTransporter {
  constructor(protected credentials: any) { }

  abstract sendEmail(to: string, subject: string, text: string, html: string, from?: string): Promise<boolean>;
}


export class AzureEmailTransporter extends EmailTransporter {
  private client: EmailClient;

  constructor() {
    super({ connectionString: EmailConfig.AZURE.CONNECTION_STRING });
    this.client = new EmailClient(this.credentials.connectionString);
  }

  async sendEmail(to: string, subject: string, text: string, html: string, from?: string): Promise<boolean> {
    // Convert 'to' into an array of email objects
    const recipients = to.split(',').map(email => ({ address: email.trim() }));

    const emailMessage = {
      senderAddress: from || "DoNotReply@azurecomm.net",
      content: {
        subject,
        plainText: text,
        html,
      },
      recipients: {
        to: recipients, // Recipients should be an array
      },
    };

    console.log("Preparing to send email using Azure Email Transporter:", emailMessage);

    try {
      const poller = await this.client.beginSend(emailMessage);
      const result: any = await poller.pollUntilDone();
      console.log("Azure Email Transporter response:", result);

      // Log the entire result to see what properties are returned
      console.log("Polling result:", result); // Log the entire result to examine all properties

      // Check for 'Succeeded' status and possible additional properties
      if (result && result.status === "Succeeded") {
        console.log("Email sent successfully!");
        return true;
      } else {
        // Log additional details if the status is 'Succeeded'
        console.error("Failed to send email. Result Details:", result);
        return false;
      }
    } catch (error:any) {
      console.error("Azure Email Transporter encountered an error:", error.response || error);
      return false;
    }
  }
}



export class AmazonSesEmailTransporter extends EmailTransporter {
  private transporter: nodemailer.Transporter;

  constructor() {
    super({
      host: EmailConfig.AMAZON.HOST,
      port: EmailConfig.AMAZON.PORT,
      user: EmailConfig.AMAZON.USER,
      pass: EmailConfig.AMAZON.PASS,
    });

    this.transporter = nodemailer.createTransport({
      host: this.credentials.host,
      port: this.credentials.port,
      auth: {
        user: this.credentials.user,
        pass: this.credentials.pass,
      },
    });
  }

  async sendEmail(to: string, subject: string, text: string, html: string, from?: string): Promise<boolean> {
    const mailOptions = {
      from: from || this.credentials.user,
      to: to || "choudharinikita96@gmail.com",
      subject,
      text,
      html,
    };

    console.log("Preparing to send email using Amazon SES:", mailOptions);

    try {
      await this.transporter.sendMail(mailOptions);
      console.log("Email sent successfully using Amazon SES!");
      return true;
    } catch (error) {
      console.error("Amazon SES Transporter failed to send email:", error);
      return false;
    }
  }
}
