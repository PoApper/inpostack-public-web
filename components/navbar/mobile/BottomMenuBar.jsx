import { Menu } from 'semantic-ui-react'
import NavbarSearch from '../navbar.search'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'

const BottomMenuBar = () => {
  return (
    <BottomMenu text vertical>
      <Menu.Item>
        <NavbarSearch/>
      </Menu.Item>

      <Link href={'/store'} passHref>
        <Menu.Item>
          가게 목록
        </Menu.Item>
      </Link>

      <Link href={'/store'} passHref>
        <Menu.Item>
          In POSTECH?
        </Menu.Item>
      </Link>
    </BottomMenu>
  )
}

export default BottomMenuBar

const BottomMenu = styled(Menu)`
  width: 100% !important;
  padding: 0 16px;
  margin: 0 !important;

  .item {
    margin-top: 0 !important
  }
`