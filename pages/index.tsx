import type { NextPage } from 'next'
import { HomeComponent } from '../components'
import { NavBar } from '../components/NavBar'
import { useModal } from '../hooks/useModal'

const Home: NextPage = () => {

  const [isOpen, setOpenClose] = useModal()

  return (
    <div>
      <NavBar setOpenClose={setOpenClose} />
      <HomeComponent setOpenClose={setOpenClose} isOpen={isOpen} />
    </div>
  )
}

export default Home
