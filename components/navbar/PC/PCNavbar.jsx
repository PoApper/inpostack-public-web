import Link from 'next/link'
import { Image, Menu } from 'semantic-ui-react'
import { InPoStackText } from '../../common/title'
import React from 'react'
import styled from 'styled-components'
import NavbarSearch from '../navbar.search'
import UserInfoItem from './UserInfoItem'

const PCNavbar = () => {
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

        <UserInfoItem/>

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
