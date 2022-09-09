<<<<<<< HEAD
=======
import { signOut, useSession } from 'next-auth/react';
>>>>>>> sign-in-connect
import Link from 'next/link'

export interface NavbarProps {
  page: string;
}

export const Navbar = (props: NavbarProps) => {
<<<<<<< HEAD
  return (
    <>
      <nav className="sticky top-0 z-50 w-full text-stone-500 border-b border-gray-200 bg-amber-50">
=======
  const { data: session, status } = useSession();

  const so = () => {
    signOut();
  }

  if (status === "authenticated") {
    return (
      <>
        <nav className="sticky top-0 z-50 w-full text-stone-500 border-b border-gray-200 bg-amber-50">
>>>>>>> sign-in-connect
        <div className="flex justify-between h-auto w-full py-5 px-10">
          <div className="flex flex-row justify-center items-center">
            <img
              src="/images/logo_vert_5.png"
              alt="An SVG of the Emurr Logo"
              className="w-20 h-20 mr-5"
            />
            <div className="text-3xl font-semibold">
              EMURR
<<<<<<< HEAD
            </div>
          </div>
=======
            </div>
          </div>
          <div className="flex flex-row justify-center items-center text-2xl">
            <div className={`p-2 rounded-md ${props.page === "home" ? "font-semibold text-stone-700" : ""} hover:bg-stone-600 hover:font-normal hover:text-stone-50 transition ease-in-out delay-50`}>
              {/* Add this once profile page */}
              {/* <Link href="/profilepage">
                <img src="/images/google.png" className="w-5 h-5"></img>
              </Link> */}

              <button onClick={so}>
                <img src="/images/google.png" className="w-5 h-5"></img>
              </button>
            </div>
          </div>
        </div>
      </nav>
      </>
    )
  }


  return (
    <>
      <nav className="sticky top-0 z-50 w-full text-stone-500 border-b border-gray-200 bg-amber-50">
        <div className="flex justify-between h-auto w-full py-5 px-10">
          <div className="flex flex-row justify-center items-center">
            <img
              src="/images/logo_vert_5.png"
              alt="An SVG of the Emurr Logo"
              className="w-20 h-20 mr-5"
            />
            <div className="text-3xl font-semibold">
              EMURR
            </div>
          </div>
>>>>>>> sign-in-connect
          <div className="flex flex-row justify-center items-center text-2xl">
            <div className={`p-2 rounded-md ${props.page === "home" ? "font-semibold text-stone-700" : ""} hover:bg-stone-600 hover:font-normal hover:text-stone-50 transition ease-in-out delay-50`}>
              <Link href="/">
                home
              </Link>
            </div>
            <div className={`p-2 rounded-md ${props.page === "about" ? "font-semibold text-stone-700" : ""} hover:bg-stone-600 hover:font-normal hover:text-stone-50 transition ease-in-out delay-50`}>
              <Link href="/about" className="m-5">
                about
              </Link>
            </div>
            <div className={`p-2 rounded-md ${props.page === "login" ? "font-semibold text-stone-700" : ""} hover:bg-stone-600 hover:font-normal hover:text-stone-50 transition ease-in-out delay-50`}>
              <Link href="/login" className="m-5">
                login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
