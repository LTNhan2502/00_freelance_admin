import { useEffect, useState } from 'react'
import { Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import DashboardPage from './containers/DashboardPage'
import Header from './containers/header/Header'
import SideMenu from './containers/side/SideMenu'
import ContentPage from './containers/content/ContentPage'
import Footer from './containers/footer/Footer'
import './App.css'
import AppRoutes from './containers/routes/AppRoutes'

function App() {
  // Check var xem đã đăng nhập chưa
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigate = useNavigate()

  // Kiểm tra trạng thái đăng nhập khi vừa vào web
  useEffect(() => {
    const auth = localStorage.getItem("username")

    if(auth){
      setIsAuthenticated(true)
    }else{
      navigate('/login')
    }
  }, [navigate])

  return (
    <div className='App'>
      {isAuthenticated ? (
        <>
          {/* Main layout khi đã đăng nhập */}
          <Header/>
          <Space className='sideMenuAndContent'>
            <SideMenu></SideMenu>
            <ContentPage></ContentPage>
          </Space>
          <Footer/>
        </>
      ) : (
        // Khi chưa đăng nhập thì qua bên AppRoutes để điều hướng vào login
        <AppRoutes/>
      )}
    </div>
  )
}

export default App
