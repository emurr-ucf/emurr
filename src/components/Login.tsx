import { FormType } from '../pages/login';

interface LoginProps {
  hook: (value: FormType) => void;
}

export const Login = (props: LoginProps) => {
  return (
    <>
      <form action="/api/login" method="POST" className="flex flex-col w-64 gap-6">
        <div className="text-3xl">
          Login
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            autoComplete="on"
            placeholder="Email"
            className="w-full h-12 appearance-none border border-stone-800 rounded px-3"
          />
          <input
            type="password"
            autoComplete="on"
            placeholder="Password"
            className="w-full h-12 appearance-none border border-stone-800 rounded px-3"
          />
        </div>
        <div className="flex justify-center">
          <div
            onClick={() => props.hook(FormType.FORGOT_PASSWORD)}
            className="cursor-pointer select-none"
          >
            Forgot password?
          </div>
          <div className="mx-2 border-l-2 rounded border-stone-400"></div>
          <div
            onClick={() => props.hook(FormType.REGISTER)}
            className="cursor-pointer select-none"
          >
            Register
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-3 px-4 w-3/4 shadow-sm text-sm font-medium rounded-md text-white bg-green-800 hover:bg-green-900"
          >
            Login
          </button>
        </div>
      </form>
    </>
  )
}
