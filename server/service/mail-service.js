const nodemailer = require('nodemailer')

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.SMTP_USER,
        clientId: process.env.SMTP_GMAIL_CLIENT_ID,
        clientSecret: process.env.SMTP_GMAIL_CLIENT_SECRET,
        refreshToken: process.env.SMTP_GMAIL_REFRESH_TOKEN,
        accessToken: process.env.SMTP_GMAIL_ACCESS_TOKEN,
      },
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail(
      {
        from: process.env.SMTP_USER,
        to,
        subject: 'Активация аккаунта на ' + process.env.API_URL,
        text: '',
        html: `
        <div>
          <h1>Для активации перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
      },
      (err, info) => {
        if (err) {
          console.log(123, err)
        } else {
          console.log('message: ' + info.messageId)
        }
        this.transporter.close()
      }
    )
  }

}

module.exports = new MailService()
