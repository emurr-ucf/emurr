import { useState, useEffect } from "react";
import { FormType } from "../../pages/login";

import {
  getProviders,
  signIn,
  ClientSafeProvider,
  LiteralUnion,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

interface LoginProps {
  hook: (value: FormType) => void;
}

export const Login = (props: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();

  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);

  return (
    <>
      <form className="flex flex-col w-64 gap-6">
        <div className="text-2xl">Login</div>
        {providers?.credentials && (
          <>
            <input
              id="email"
              type="text"
              autoComplete="on"
              name="email"
              placeholder="Email"
              onChange={({ target: { name, value } }) => {
                setEmail(value);
              }}
              className="h-12 appearance-none border border-brown rounded px-3"
            />
            <input
              type="password"
              autoComplete="on"
              name="password"
              placeholder="Password"
              onChange={({ target: { name, value } }) => {
                setPassword(value);
              }}
              className="h-12 appearance-none border border-brown rounded px-3"
            />
            <div className="flex justify-center">
              <button
                onClick={() =>
                  signIn(providers.credentials.id, {
                    email,
                    password,
                  })
                }
                type="button"
                className="button-primary"
              >
                <div>Login</div>
              </button>
            </div>
          </>
        )}
        <div className="flex justify-center text-brown">
          <div
            onClick={() => props.hook(FormType.FORGOT_PASSWORD)}
            className="cursor-pointer select-none hover:text-background-900"
          >
            Forgot password?
          </div>
          <div className="mx-2 border-l-2 rounded border-brown"></div>
          <div
            onClick={() => props.hook(FormType.REGISTER)}
            className="cursor-pointer select-none hover:text-background-900"
          >
            Register
          </div>
        </div>
      </form>
    </>
  );
};
