import React, { useState } from 'react'
import { Icon, Image, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import styled from 'styled-components'
import NavbarSearch from './navbar.search'
import useUser from '../../data/useUser'

const MobileNavbar = (props) => {
  const { user, isLogout } = useUser();
  const handleLogout = props.handleLogout;
  const [showBottomBar, setShowBottomBar] = useState(false);
  const [showUserBar, setShowUserBar] = useState(false);

  return (
    <NavbarWrapper>
      <NavbarMenu borderless>
        <Menu.Item position={'left'}
                   onClick={() => setShowBottomBar(!showBottomBar)}>
          <Icon name={'sidebar'}/>
        </Menu.Item>
        <Menu.Item>
          <Link href={'/'} passHref>
            <a>
              <LogoDiv>
                <Image centered src={'/inpostack-logo.svg'} alt="logo"
                       style={{ width: '24px' }}/>
              </LogoDiv>
            </a>
          </Link>
        </Menu.Item>
        <Menu.Item position={'right'}
                   onClick={() => setShowUserBar(!showUserBar)}>
          <Icon name={'user'}/>
        </Menu.Item>
      </NavbarMenu>
      {
        showBottomBar ? (
          <BottomMenu text vertical>
            <Menu.Item>
              <NavbarSearch/>
            </Menu.Item>
            <Menu.Item>
              <Link href={'/store'} passHref>
                <a style={{color: 'black'}}>전체 가게 보기</a>
              </Link>
            </Menu.Item>
          </BottomMenu>
        ) : null
      }
      {
        showUserBar ? (
          <BottomMenu text vertical>
            <Menu.Menu position='right'>
              <Menu.Item>
                {user.name}
              </Menu.Item>
              <Menu.Item onClick={handleLogout}>
                로그아웃
              </Menu.Item>
              <Menu.Item>
                <Link href={'/user/favorite'} passHref>
                  <a style={{color: 'black'}}>관심 가게</a>
                </Link>
              </Menu.Item>
            </Menu.Menu>
          </BottomMenu>
        ) 
        : null
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

const BottomMenu = styled(Menu)`
  width: 100% !important;
  padding: 0 16px;
  margin: 0 !important;

  .item {
    margin-top: 0 !important
  }
`