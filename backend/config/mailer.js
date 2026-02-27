import dotenv from 'dotenv'
dotenv.config()

export const sendVerificationEmail = async (to, verify_token) => {
  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': process.env.MAIL_PASS,
    },
    body: JSON.stringify({
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
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Brevo error : ${error.message}`)
  }

  console.log('✅ Email envoyé à', to)
}