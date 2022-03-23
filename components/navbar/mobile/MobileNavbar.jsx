import React, { useState } from 'react'
import { Icon, Image, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import styled from 'styled-components'
import BottomMenuBar from './BottomMenuBar'
import BottomUserMenuBar from './BottomUserMenuBar'

const MobileNavbar = () => {
  const [showBottomMenuBar, setShowBottomMenuBar] = useState(false)
  const [showUserBar, setShowUserBar] = useState(false)

  return (
    <NavbarWrapper>
      <NavbarMenu borderless>
        <Menu.Item position={'left'}
                   onClick={() => {
                     setShowUserBar(false);
                     setShowBottomMenuBar(!showBottomMenuBar);
                   }}>
          <Icon name={'sidebar'}/>
        </Menu.Item>

        <Menu.Item>
          <Link href={'/'} passHref>
            <LogoDiv>
              <Image centered src={'/inpostack-logo.svg'} alt="logo"
                     style={{ width: '24px' }}/>
            </LogoDiv>
          </Link>
        </Menu.Item>

        <Menu.Item position={'right'}
                   onClick={() => {
                     setShowBottomMenuBar(false);
                     setShowUserBar(!showUserBar);
                   }}>
          <Icon name={'user'}/>
        </Menu.Item>
      </NavbarMenu>

      {
        showBottomMenuBar ? (
          <BottomMenuBar/>
        ) : null
      }

      {
        showUserBar ? (
          <BottomUserMenuBar/>
        ) : null
      }

    </NavbarWrapper>
  )
}

export default MobileNavbar

const NavbarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto !important;

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
