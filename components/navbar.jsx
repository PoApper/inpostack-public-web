import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Dropdown, Icon, Image, Menu, Search } from 'semantic-ui-react'
import styled from 'styled-components'
import { useMediaQuery } from 'react-responsive'
import axios from 'axios'

import { InPoStackText } from './common/title'

const Navbar = () => {
  const router = useRouter()
  const [user, setUser] = useState()

  useEffect(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true })
    setUser(res.data)
  })

  // const [menuFixed, setMenuFixed] = useState(false)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
  const handleLogout = async () => {
    try {
      axios.get(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
        withCredentials: true,
      })
      alert('로그아웃 되었습니다.')
      router.push('/')
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

const PCNavbar = (props) => {
  const user = props.user
  const handleLogout = props.handleLogout

  return (
    <NavbarWrapper>
      <NavbarMenu borderless>
        <Link href={'/'}>
          <LogoMenuItem position="left">
            <LogoDiv>
              <div style={{ marginRight: '1.2rem' }}>
                <Image centered src={'/inpostack-logo.svg'} alt="logo"
                       style={{ width: '24px' }}/>
              </div>
              <LogoHeader>
                <InPoStackText/>
              </LogoHeader>
            </LogoDiv>
          </LogoMenuItem>
        </Link>
        <SearchWrapper>
          <Search
            input={{ fluid: true }}
          />
        </SearchWrapper>
        {
          user ?
            <Menu.Item position={'right'}>
              <Dropdown item simple
                        text={`${user.name}님`}>
                <Dropdown.Menu style={{
                  border: 'none',
                  boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                }}>
                  <Dropdown.Item text={'로그아웃'} onClick={handleLogout}/>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            :
            <Menu.Item position={'right'}>
              <Button style={{ border: 'none', background: 'none' }}
                      href={`${process.env.NEXT_PUBLIC_API}/auth/login?redirect=https://inpo.poapper.com`}>
                로그인
              </Button>
            </Menu.Item>
        }
      </NavbarMenu>
    </NavbarWrapper>

  )
}

const MobileNavbar = (props) => {
  const user = props.user
  const [showBottomBar, setShowBottomBar] = useState(false)

  return (
    <NavbarWrapper>
      <NavbarMenu borderless>
        <Menu.Item position={'left'}
                   onClick={() => setShowBottomBar(!showBottomBar)}>
          <Icon name={'sidebar'}/>
        </Menu.Item>
        <Menu.Item>
          <Link href={'/'}>
            <LogoDiv>
              <Image centered src={'/inpostack-logo.svg'} alt="logo"
                     style={{ width: '24px' }}/>
            </LogoDiv>
          </Link>
        </Menu.Item>
        <Menu.Item position={'right'}>
          <Icon name={'user'}/>
        </Menu.Item>
      </NavbarMenu>
      {
        showBottomBar ? (
          <BottomMenu text vertical>
            <Menu.Item>
              <Search size="mini" input={{ fluid: true }}/>
            </Menu.Item>
            <Menu.Item>
              전체 가게 보기
            </Menu.Item>
          </BottomMenu>
        ) : null
      }
    </NavbarWrapper>
  )
}

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

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;

  max-width: ${({ theme }) => theme.contentWidth};
`

const NavbarMenu = styled(Menu)`
  box-shadow: none !important;
  border: none !important;
  width: 100%;
  margin: 0 !important;
`

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`

const BottomMenu = styled(Menu)`
  width: 100% !important;
  padding: 0 16px;
  margin: 0 !important;

  .item {
    margin-top: 0 !important
  }
`

const LogoHeader = styled.h1`
  font-family: Oswald, serif;
  font-size: 1.8rem;
  margin: 0;
`

const LogoMenuItem = styled(Menu.Item)`
  &:hover {
    background: white !important;
  }
`

const SearchWrapper = styled.div`
  margin: auto 0;
  width: 400px;
`
