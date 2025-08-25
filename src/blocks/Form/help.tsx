// const nodemailer = require("nodemailer");
import nodemailer from 'nodemailer'
import { loadEnvFile } from 'node:process'

loadEnvFile('.env')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'j.m.m.bozek@gmail.com',
    pass: process.env.GOOGLE_APP_PASS,
  },
})
// Wrap in an async IIFE so we can use await.
;(async () => {
  const info = await transporter.sendMail({
    from: '"Jakub Bożek" <j.m.m.bozek@gmail.com>',
    to: 'kuba.bozek@proton.me',
    subject: 'Hello ✔',
    text: 'Hello world?', // plain‑text body
    html: '<b>Hello world?</b>', // HTML body
  })

  console.log('Message sent:', info.messageId)
})()
