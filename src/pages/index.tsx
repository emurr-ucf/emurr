import Link from 'next/link'
import type { NextPage } from 'next'
import Navbar from '../components/Navbar'
import Login from '../components/Login'
import Filezone from '../components/Filezone'
import Signup from '../components/Signup'

const Home: NextPage = () => {  


  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Signup />
    </div>
  )
}

export default Home
