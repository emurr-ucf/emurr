import type { NextPage } from 'next'
import { Navbar } from '../components/Navbar'
import { Login } from '../components/Login'
import Filezone from '../components/Filezone'

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Login />
    </div>
  )
}

export default Home
