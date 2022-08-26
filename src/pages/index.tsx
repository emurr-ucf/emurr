import Link from 'next/link'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import Login from '../components/Login'

const Home: NextPage = () => {  


  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Login />
      <div className="bg-purple dark:bg-slate-800 w-screen h-screen flex justify-center items-center">
        <div className="text-slate-900 dark:text-white text-4xl">Everything is fine.</div>
        <Link href="/tinymce"><a>test</a></Link>
      </div>
    </div>
  )
}

export default Home
