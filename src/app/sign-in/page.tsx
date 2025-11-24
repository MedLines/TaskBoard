import Link from 'next/link'

import { Cardcompact } from '@/components/card-compact'
import { SignInForm } from '@/features/auth/components/sign-in-form'
import { passwordForgotPath, signUpPath } from '@/paths'

export default function SignInPage() {
  return (
    <div className="flex-1 flex flex-col justify-center items-center">
      <Cardcompact
        title="Sign In"
        description="Sign in to your account"
        content={<SignInForm />}
        className="w-full max-w-[420px] animate-fade-in-from-top"
        footer={
          <>
            <div className="text-sm text-muted-foreground flex flex-1 justify-between ">
              <p>
                No account yet?
                <span>
                  {' '}
                  <Link
                    className="hover:text-white hover:underline"
                    href={signUpPath()}
                  >
                    Sign Up
                  </Link>
                </span>
              </p>
              <Link
                className="hover:text-white hover:underline"
                href={passwordForgotPath()}
              >
                Forgot Password
              </Link>
            </div>
          </>
        }
      />
    </div>
  )
}
