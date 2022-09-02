import type { NextPage } from 'next'
import { Login } from '../components/Login'
import { Navbar } from '../components/Navbar'

const LoginPage: NextPage = () => {
  return (
    <>
      <div className="w-full h-screen bg-amber-50 overflow-y-hidden">
        <Navbar 
          page="login"
        />
        <div className="flex w-full h-full justify-center text-green-800">
          <div className="flex justify-center w-4/5 h-fit p-5 mt-28 rounded-lg bg-white shadow-sm shadow-stone-700">
            <div className="flex flex-col">
              <div className="text-5xl">
                Editor Login
              </div>
              <Login />
              <button className="">
                test
              </button>
            </div>
            <div className="mx-10 border-l-2 rounded border-stone-400"></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginPage
