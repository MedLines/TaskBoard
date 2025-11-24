import Link from 'next/link'

import { Cardcompact } from '@/components/card-compact'
import { SignUpForm } from '@/features/auth/components/sign-up-form'
import { signInPath } from '@/paths'

const SignUpPage = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Cardcompact
        title="Sign Up"
        description="Creat an account to get started!"
        className="w-full max-w-[420px] animate-fade-in-from-top"
        content={<SignUpForm />}
        footer={
          <p className="text-sm text-muted-foreground">
            Already have an account?
            <span>
              {' '}
              <Link
                className="hover:text-white hover:underline"
                href={signInPath()}
              >
                Sign In
              </Link>
            </span>
          </p>
        }
      />
    </div>
  )
}

export default SignUpPage
