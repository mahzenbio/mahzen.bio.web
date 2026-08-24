function readField(body: Record<string, unknown>, key: string) {
  const value = body[key]

  return typeof value === 'string'
    ? value.trim()
    : ''
}

function validate(body: Record<string, unknown>) {
  const subject = readField(body, 'subject')
  const message = readField(body, 'message')

  const errors: string[] = []

  if (subject.length < 3 || subject.length > 150) {
    errors.push('Konu 3 ile 150 karakter arasında olmalı.')
  }

  if (message.length < 10 || message.length > 2000) {
    errors.push('Mesaj 10 ile 2000 karakter arasında olmalı.')
  }

  if (errors.length) {
    throw createError({
      statusCode: 422,
      statusMessage: 'Form geçersiz',
      data: { errors },
    })
  }

  return { subject, message }
}

export default defineEventHandler(async (event) => {
  const { resend: options } = useRuntimeConfig(event)

  if (!options.apiKey || !options.from || !options.to) {
    throw createError({
      statusCode: 500,
      statusMessage: 'E-posta servisi yapılandırılmamış',
    })
  }

  const body = await readBody(event)
  const payload = validate(body ?? {})

  const resend = useResend()

  const { error } = await resend.emails.send({
    from: options.from,
    to: [options.to],
    subject: `[mahzen.bio] ${payload.subject}`,
    text: payload.message,
  })

  if (error) {
    console.error('[contact] Resend error:', error)

    throw createError({
      statusCode: 502,
      statusMessage: 'Mesaj şu anda gönderilemiyor',
    })
  }

  return { success: true }
})
