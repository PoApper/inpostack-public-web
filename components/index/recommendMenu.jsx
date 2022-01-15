import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import axios from 'axios'
import { Icon, Image } from 'semantic-ui-react'

const RecommendMenu = () => {
  const [menus, setMenus] = useState([])
  const [randMenu, setRandMenu] = useState({})

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/menu/recommend`)
      .then(res => setMenus(res.data))
      .catch(() => alert(`추천 메뉴 목록을 불러오는데 실패했습니다.`))
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/menu/random`)
      .then(res => setRandMenu(res.data))
      .catch(() => alert(`랜덤 메뉴 정보를 불러오는데 실패했습니다.`))
  }, [])

  console.log(randMenu);

  if (menus.length && randMenu) {
    return (
      <div>
        <Title>이런 메뉴는 어때요?</Title>
        <CardContainer>
          {
            menus.map(menu => {
              return (
                <Link href={`/store/${menu.store_name}`} key={menu.uuid} passHref>
                  <MainBox>
                    <Image
                      src={menu.image_url ??
                      'https://source.unsplash.com/600x600/?food'}
                      alt={'food_img'}
                      width={120} height={120}
                      centered
                    />
                    <h3>{menu.name}</h3>
                  </MainBox>
                </Link>
              )
            })
          }
          <Link href={`/store/${randMenu.store_name}`} key={randMenu.uuid} passHref>
            <MainBox>
              <Icon
                circular
                name={'random'} size={'big'}
                className={'box bounce-distortion inpostack-blue2'}
                style={{ margin: 'auto' }}
              />
              <h3>Random Pick</h3>
            </MainBox>
          </Link>
        </CardContainer>
      </div>
    )
  } else {
    // TODO: 메뉴 없음 Hero 구현할 것
    return (<></>)
  }
}

export default RecommendMenu

const Title = styled.h2`
  margin-bottom: 1rem;
`

const MainBox = styled.div`
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  padding: 25px 24px 25px;
  transition: all 200ms;
  text-align: center;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 20%);
  }

  h6 {
    color: #888;
    font-size: 12px;
    margin: 5px 0 0;
  }

  p {
    font-size: 35px;
    margin: auto;
  }
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  align-items: stretch;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }
`