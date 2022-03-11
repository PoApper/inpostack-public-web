import React, { useState } from 'react'
import { Icon, Image, Menu, Search } from 'semantic-ui-react'
import Link from 'next/link'
import styled from 'styled-components'
import useUser from '../../data/useUser'

const MobileNavbar = () => {
  const { user, isLogout } = useUser();
  const [showBottomBar, setShowBottomBar] = useState(false)

  return (
    <NavbarWrapper>
      <NavbarMenu borderless>
        <Menu.Item position={'left'}
                   onClick={() => setShowBottomBar(!showBottomBar)}>
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
        <Menu.Item position={'right'}>
          <Icon name={'user'}/>
        </Menu.Item>
      </NavbarMenu>
      {
        showBottomBar ? (
          <BottomMenu text vertical>
            <Menu.Item>
              <Search
                size="mini"
                value={""}
                placeholder={'coming soon... 👨‍🚀'}
                input={{ fluid: true }}
              />
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

export default MobileNavbar

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