import React from 'react'
import Sidebar from './Sidebar'

const Layout = ({ children, setToken }) => {
  return (
    <div>
      <Sidebar setToken={setToken} />
      {children}
    </div>
  )
}

export default Layout
