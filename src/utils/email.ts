import nodemailer from 'nodemailer';
import config from 'config';
import pug from 'pug';
import { convert } from 'html-to-text';
import { Prisma } from '@prisma/client';
export default class Email {
  #firstName: string;
  #to: string;
  #from: string;
  constructor(private agent: Prisma.AgentCreateInput, private url: string) {
    this.#firstName = agent.firstName.split(' ')[0];
    this.#to = agent.email;
    this.#from = `Novel-AG <dev.farmzoneafrica@gmail.com`;
  }

  private newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    // }

    return nodemailer.createTransport({
       service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.#firstName,
      subject,
      url: this.url,
    });
    // Create mailOptions
    const mailOptions = {
      from: this.#from,
      to: this.#to,
      subject,
      text: convert(html),
      html,
    };

    // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send('verificationCode', 'Your account verification code');
  }

  async sendPasswordResetToken() {
    await this.send(
      'resetPassword',
      'Your password reset token (valid for only 10 minutes)'
    );
  }
}