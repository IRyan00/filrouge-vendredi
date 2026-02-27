import * as brevo from '@getbrevo/brevo'
import dotenv from 'dotenv'

dotenv.config()

export const sendVerificationEmail = async (to, verify_token) => {
  const apiInstance = new brevo.TransactionalEmailsApi()
  
  apiInstance.authentications['api-key'].apiKey = process.env.MAIL_PASS

  await apiInstance.sendTransacEmail({
    subject: 'Vérifie ton compte CyberMapp',
    to: [{ email: to }],
    sender: { email: process.env.MAIL_USER, name: 'CyberMapp' },
    htmlContent: `
      <h2>Bienvenue sur CyberMapp !</h2>
      <p>Clique sur le lien ci-dessous pour vérifier ton email :</p>
      <a href="${process.env.CLIENT_URL}/verify/${verify_token}">
        Vérifier mon email
      </a>
    `,
  })

  console.log('✅ Email envoyé à', to)
}