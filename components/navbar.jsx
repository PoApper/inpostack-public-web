import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Button, Dropdown, Image, Search, Menu } from 'semantic-ui-react'
import styled from 'styled-components'

import useUser from '../data/useUser'
import { logout } from '../requests/userApi'
import { InPoStackText } from './common/title';

const Navbar = () => {
  const router = useRouter()
  const { user, loading } = useUser()
  // const [menuFixed, setMenuFixed] = useState(false)

  return (
    <_Navbar>
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
                          text={`[${user.account_type}] ${user.name} (${user.id})`}>
                  <Dropdown.Menu style={{
                    border: 'none',
                    boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                  }}>
                    <Dropdown.Item text={'로그아웃'} onClick={() => {
                      logout()
                    }}/>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
              :
              <Menu.Item position={'right'}>
                <Button style={{ border: 'none', background: 'none' }}
                        href={'/login'}>로그인</Button>
              </Menu.Item>
          }
        </NavbarMenu>
      </NavbarWrapper>
    </_Navbar>
  )
}

export default Navbar

const _Navbar = styled.nav`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;

  font-weight: bold;
  width: 100%;

  position: fixed;
  top: 0;
  z-index: 10;
`

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: auto;

  max-width: ${({ theme }) => theme.contentWidth};
`

const NavbarMenu = styled(Menu)`
  box-shadow: none !important;
  border: none !important;
  width: 100%;
`

const LogoDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
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