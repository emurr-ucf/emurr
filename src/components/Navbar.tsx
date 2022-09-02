import Link from 'next/link'

export const Navbar = () => {
  return (
    <>
      <nav className="sticky top-0 z-50 text-stone-500 border-b border-gray-200 bg-amber-50">
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
          <div className="flex flex-row justify-center items-center text-2xl">
            <div className="p-2 rounded-md hover:bg-stone-600 hover:text-stone-50 transition ease-in-out delay-50">
              <Link href={"/"}>
                home
              </Link>
            </div>
            <div className="p-2 rounded-md hover:bg-stone-600 hover:text-stone-50 transition ease-in-out delay-50">
              <Link href={"/about"} className="m-5">
                about
              </Link>
            </div>
            <div className="p-2 rounded-md hover:bg-stone-600 hover:text-stone-50 transition ease-in-out delay-50">
              <Link href={"/login"} className="m-5">
                login
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
