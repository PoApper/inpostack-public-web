import { Button, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import useUser from '../../../data/useUser'
import axios from 'axios'

const BottomUserMenuBar = () => {
  const { user, isLogout } = useUser()

  function handleLogout () {
    axios.get(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
      withCredentials: true,
    }).then(() => {
      alert('로그아웃 되었습니다.')
      window.location.reload()
    }).catch((err) => {
      alert('로그아웃에 실패했습니다.')
      console.log(err)
    })
  }

  return (
    <BottomMenu text vertical>
      <Menu.Menu position="right">
        {
          !isLogout ? (
            <>
              <Menu.Item>
                {user.name}
              </Menu.Item>

              <Menu.Item onClick={handleLogout}>
                로그아웃
              </Menu.Item>

              <Link href={'/user/favorite'} passHref>
                <Menu.Item>
                  관심 가게
                </Menu.Item>
              </Link>
            </>
          ) : (
            <>
              <Menu.Item position={'right'}>
                <Button
                  style={{ border: 'none', background: 'none' }}
                  href={`${process.env.NEXT_PUBLIC_API}/auth/login?redirect=https://inpostack.poapper.club`}>
                  로그인
                </Button>
              </Menu.Item>
            </>
          )
        }
      </Menu.Menu>
    </BottomMenu>
  )
}

export default BottomUserMenuBar

const BottomMenu = styled(Menu)`
  width: 100% !important;
  padding: 0 16px;
  margin: 0 !important;

  .item {
    margin-top: 0 !important
  }
`