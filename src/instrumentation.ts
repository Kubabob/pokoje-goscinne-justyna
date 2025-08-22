import { registerOTel } from '@vercel/otel'

export function register() {
  registerOTel('my-next-app')
}
