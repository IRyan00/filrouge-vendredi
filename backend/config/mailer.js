import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false, // false pour port 587 (TLS), true pour 465 (SSL)
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

transporter.verify()
  .then(() => console.log('SMTP connecté'))
  .catch(err => console.warn('SMTP erreur de connexion:', err.message))

export default transporter