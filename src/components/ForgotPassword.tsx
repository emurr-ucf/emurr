import { FormType } from '../pages/login';

interface ForgotPasswordProps {
  hook: (value: FormType) => void;
}

export const ForgotPassword = (props: ForgotPasswordProps) => {
  return (
    <>
      <form action="/api/forgot-password" method="POST" className="flex flex-col w-64 gap-6">
        <div className="text-3xl">
          Forgot Password
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            autoComplete="on"
            placeholder="Email"
            className="h-12 appearance-none border border-stone-800 rounded px-3"
          />
        </div>
        <div className="flex justify-center">
          <div
            onClick={() => props.hook(FormType.LOGIN)}
            className="cursor-pointer select-none text-brown hover:text-background-900"
          >
            Back to login
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-3 px-4 w-3/4 shadow-sm text-sm rounded-md text-background-200 bg-green-700 hover:bg-green-900"
          >
            Send Email
          </button>
        </div>
      </form>
    </>
  )
}
