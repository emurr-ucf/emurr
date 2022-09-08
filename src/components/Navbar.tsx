import Link from 'next/link'

export interface NavbarProps {
  page: string;
}

export const Navbar = (props: NavbarProps) => {
  return (
    <>
      <nav className="sticky top-0 z-50 w-full text-green-700 border-b border-brown backdrop-blur-md">
        <div className="flex justify-between h-auto w-full py-2 px-10">
          <div className="flex flex-row justify-center items-center gap-5">
            <img
              src="/images/logo_vert_5.png"
              alt="An SVG of the Emurr Logo"
              className="w-10 h-10"
            />
            <div className="text-2xl font-semibold">
              EMURR
            </div>
          </div>
          <div className="flex flex-row justify-center items-center text-xl">
            <div className={`p-2 rounded-md ${props.page === "home" ? "font-semibold text-brown hover:font-semibold" : ""} hover:bg-background-700 hover:font-normal transition ease-in-out delay-50`}>
              <Link href="/">
                home
              </Link>
            </div>
            <div className={`p-2 rounded-md ${props.page === "about" ? "font-semibold text-green-700 hover:font-semibold" : ""} hover:bg-background-700 hover:font-normal transition ease-in-out delay-50`}>
              <Link href="/about" className="m-5">
                about
              </Link>
            </div>
            <div className={`p-2 rounded-md ${props.page === "login" ? "font-semibold text-green-700 hover:font-semibold" : ""} hover:bg-background-700 hover:font-normal transition ease-in-out delay-50`}>
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
