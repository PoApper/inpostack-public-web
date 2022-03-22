import Link from 'next/link'
import { Button, Dropdown, Image, Menu } from 'semantic-ui-react'
import { InPoStackText } from '../common/title'
import React from 'react'
import styled from 'styled-components'
import NavbarSearch from './navbar.search'
import useUser from '../../data/useUser'

const PCNavbar = (props) => {
  const { user, isLogout } = useUser();
  const handleLogout = props.handleLogout;

  return (
    <NavbarWrapper>
      <NavbarMenu borderless>
        <Link href={'/'} passHref>
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
        <NavbarSearch/>
        {
          !isLogout ?
            <Menu.Item position={'right'}>
              <Dropdown item simple
                        text={`${user.name}님`}>
                <Dropdown.Menu style={{
                  border: 'none',
                  boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.2)',
                }}>
                  <Dropdown.Item text={'로그아웃'} onClick={handleLogout}/>
                  <Link href={'/user/favorite'} passHref>
                    <Dropdown.Item text={'관심 가게'}/>
                  </Link>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
            :
            <Menu.Item position={'right'}>
              <Button style={{ border: 'none', background: 'none' }}
                      href={`${process.env.NEXT_PUBLIC_API}/auth/login?redirect=https://inpo.poapper.club`}>
                로그인
              </Button>
            </Menu.Item>
        }
      </NavbarMenu>
    </NavbarWrapper>

  )
}

export default PCNavbar

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
