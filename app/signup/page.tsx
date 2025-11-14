import { Metadata } from 'next'
import Link from 'next/link'
import { SignUpForm } from '@/components/auth/signup-form'

export const metadata: Metadata = {
  title: 'Sign Up - Coursify',
  description: 'Create your Coursify account and start building AI-powered courses today.',
}

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-fuchsia-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Create Your Account
          </h1>
          <p className="text-gray-600">
            Start creating AI-powered courses in minutes
          </p>
        </div>

        <SignUpForm />

        <div className="mt-8 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
