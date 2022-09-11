import { FormType } from '../pages/login';

interface RegisterProps {
  hook: (value: FormType) => void;
}

export const Register = (props: RegisterProps) => {
  return (
    <>
      <form action="/api/register" method="POST" className="flex flex-col w-64 gap-6">
        <div className="text-3xl">
          Register
        </div>
        <div className="flex flex-col gap-6">
          <input
            type="text"
            autoComplete="on"
            placeholder="Email"
            className="h-12 appearance-none border border-brown rounded px-3"
          />
          <input
            type="text"
            autoComplete="on"
            placeholder="First Name"
            className="h-12 appearance-none border border-brown rounded px-3"
          />
          <input
            type="text"
            autoComplete="on"
            placeholder="Last Name"
            className="h-12 appearance-none border border-brown rounded px-3"
          />
          <input
            type="password"
            autoComplete="on"
            placeholder="Password"
            className="h-12 appearance-none border border-brown rounded px-3"
          />
          <input
            type="password"
            autoComplete="on"
            placeholder="Confirm Password"
            className="h-12 appearance-none border border-brown rounded px-3"
          />
        </div>
        <div className="flex justify-center">
          <div
            onClick={() => props.hook(FormType.LOGIN)}
            className="cursor-pointer select-none text-brown hover:text-background-900"
          >
            Already have an account?
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="py-3 px-4 w-3/4 shadow-sm text-sm font-medium rounded-md text-background-200 bg-green-700 hover:bg-green-800"
          >
            Register
          </button>
        </div>
      </form>
    </>
  )
}
