import { useState } from 'react'
import { Space } from 'antd'
import DashboardPage from './containers/DashboardPage'
import Header from './containers/header/Header'
import SideMenu from './containers/side/SideMenu'
import ContentPage from './containers/content/ContentPage'
import Footer from './containers/footer/Footer'
import './App.css'

function App() {
  return (
    <div className='App'>
      {/* <DashboardPage/> */}
      <Header/>
      <Space className='sideMenuAndContent'>
        <SideMenu></SideMenu>
        <ContentPage></ContentPage>
      </Space>
      <Footer/>
    </div>
  )
}

export default App
