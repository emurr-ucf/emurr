import Link from 'next/link'

export interface NavbarProps {
  page: string;
}

export const Navbar = (props: NavbarProps) => {
  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-brown backdrop-blur-md bg-background-400">
        <div className="flex justify-between h-auto py-2 px-10">
          <div className="flex flex-row justify-center items-center gap-4">
            <img
              src="/images/logo_vert_5.png"
              alt="An SVG of the Emurr Logo"
              className="w-10 h-10"
            />
            <div className="text-2xl font-semibold">
              EMURR
            </div>
          </div>
          <div className="flex flex-row justify-center items-center text-xl text-brown gap-2">
            <div className={`py-1 px-2 rounded-md ${props.page === "home" ? "font-semibold hover:font-semibold" : ""} hover:bg-background-600 transition ease-in-out delay-50`}>
              <Link href="/">
                home
              </Link>
            </div>
            <div className={`py-1 px-2 rounded-md ${props.page === "about" ? "font-semibold hover:font-semibold" : ""} hover:bg-background-600 transition ease-in-out delay-50`}>
              <Link href="/about" className="m-5">
                about
              </Link>
            </div>
            <div className={`py-1 px-2 rounded-md ${props.page === "login" ? "font-semibold hover:font-semibold" : ""} hover:bg-background-600 transition ease-in-out delay-50`}>
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
