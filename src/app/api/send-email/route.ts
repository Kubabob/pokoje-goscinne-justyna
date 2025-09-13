import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
    try {
        const { subject, html, text } = await request.json()

        // Create nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.GOOGLE_APP_PASS,
            },
        })

        // Send email
        const info = await transporter.sendMail({
            from: `${process.env.EMAIL_SENDER} <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_RECIPIENT,
            subject,
            text,
            html,
        })

        return NextResponse.json({ success: true, messageId: info.messageId })
    } catch (error) {
        console.error('Error sending email:', error)
        return NextResponse.json({ success: false, error: 'Failed to send email' }, { status: 500 })
    }
}
