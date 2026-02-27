import * as Brevo from '@getbrevo/brevo'
import dotenv from 'dotenv'

dotenv.config()

const apiInstance = new Brevo.TransactionalEmailsApi()
apiInstance.authentications['apiKey'].apiKey = process.env.MAIL_PASS

export const sendVerificationEmail = async (to, verify_token) => {
  const email = new Brevo.SendSmtpEmail()

  email.subject = 'Vérifie ton compte CyberMapp'
  email.to = [{ email: to }]
  email.sender = { email: process.env.MAIL_USER, name: 'CyberMapp' }
  email.htmlContent = `
    <h2>Bienvenue sur CyberMapp !</h2>
    <p>Clique sur le lien ci-dessous pour vérifier ton email :</p>
    <a href="${process.env.CLIENT_URL}/verify/${verify_token}">
      Vérifier mon email
    </a>
  `

  await apiInstance.sendTransacEmail(email)
  console.log('✅ Email envoyé à', to)
}