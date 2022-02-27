import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'
import PCNavbar from './PCNavbar'
import MobileNavbar from './MobileNavbar'

const Navbar = () => {
  const [user, setUser] = useState()
  // const [menuFixed, setMenuFixed] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })

  useEffect(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true })
    setUser(res.data)
  }, [])

  const handleLogout = async () => {
    try {
      axios.get(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
        withCredentials: true,
      })
      alert('로그아웃 되었습니다.')
      window.location.reload()
    } catch (err) {
      alert('로그아웃에 실패했습니다.')
      console.log(err)
    }
  }

  return (
    <_Navbar>
      {
        isTabletOrMobile ? (
          <MobileNavbar user={user} handleLogout={handleLogout}/>
        ) : <PCNavbar user={user} handleLogout={handleLogout}/>
      }
    </_Navbar>
  )
}

export default Navbar



const _Navbar = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  margin: 0;

  font-weight: bold;
  width: 100%;

  position: fixed;
  top: 0;
  z-index: 10;
`