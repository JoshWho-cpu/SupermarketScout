import React from 'react'
import Header from '../components/Header'
import AddStore from '../components/AddStore'
import StoreList from '../components/StoreList'

const Home = () => {
  return (
    <div>
        <Header/>
        <AddStore/>
        <StoreList />
    </div>
  )
}

export default Home