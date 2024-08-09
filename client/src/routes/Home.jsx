import React from 'react'
import Header from '../components/Header'
import AddStore from '../components/AddStore'
import StoreList from '../components/StoreList'
import ItemSearchBar from '../components/ItemSearchBar'

const Home = () => {
  return (
    <div>
        <Header/>
        <AddStore/>
        <ItemSearchBar/>
        <StoreList />
    </div>
  )
}

export default Home