import { Button, Dropdown, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'
import useUser from '../../../data/useUser'

const UserInfoItem = () => {
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
    <>
      {
        !isLogout ? (
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
        ) : (
          <Menu.Item position={'right'}>
            <Button
              style={{ border: 'none', background: 'none' }}
              href={`${process.env.NEXT_PUBLIC_API}/auth/login?redirect=https://inpo.poapper.club`}>
              로그인
            </Button>
          </Menu.Item>
        )
      }
    </>
  )
}

export default UserInfoItem