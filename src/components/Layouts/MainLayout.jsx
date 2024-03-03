import React from 'react'
import Header from '../UI/Header'
import Footer from '../UI/Footer'

const MainLayout = ( {children}) => {
  return (
    <div>
        <Header />
        <div>
            {children}
        </div>
        <Footer />
    </div>
  )
}

export default MainLayout