
import React, { FC, useState, useEffect } from 'react';
import { getProviders, signIn, ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { BuiltInProviderType } from 'next-auth/providers';

export const OAuth = () => {
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
      <div className="flex flex-col items-center justify-center w-64 gap-6">
        {providers?.google && (
          <button
            onClick={() => signIn(providers.github.id)}
            className="flex items-center justify-center gap-2 py-3 px-4 w-52 shadow-sm text-sm font-medium rounded-md text-white bg-slate-900 hover:bg-slate-700"
          >
            <div>Login with GitHub</div>
            <img src="/images/github.png" className="w-6 h-6"/>
          </button>
        )}
        {providers?.github && (
          <button
            onClick={() => signIn(providers.google.id)}
            className="flex items-center justify-center gap-2 py-3 px-4 w-52 shadow-sm text-sm font-medium border border-slate-200 rounded-md text-black hover:bg-neutral-100"
          >
            <div>Login with Google</div>
            <img src="/images/google.png" className="w-6 h-6"/>
          </button>
        )}
      </div>
    </>
  )
}
