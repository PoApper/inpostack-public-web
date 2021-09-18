import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { Icon, Image } from 'semantic-ui-react'

const RecommendStore = () => {
  const [stores, setStores] = useState([])

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/store/recommend`)
      setStores(res.data)
    } catch (err) {
      alert('추천 가게 목록을 불러오는데 실패했습니다.')
    }
  }, [])

  if (stores.length) {
    return (
      <div>
        <Title>오늘은 여기 어때요?</Title>
        <CardContainer>
          {
            stores.map(store => {
              return (
                <MainBox key={store.uuid}>
                  <Image
                    src={store.image_url ??
                    'https://source.unsplash.com/600x600/?food'}
                    atl={'store_img'}
                    width={120} height={120}
                    centered
                  />
                  <h3>{store.name}</h3>
                </MainBox>
              )
            })
          }
          <MainBox key={'random'}>
            <Icon
              circular
              name={'random'} size={'big'}
              className={'box bounce-distortion inpostack-red2'}
              style={{ margin: 'auto' }}
            />
            <h3>Random Pick</h3>
          </MainBox>
        </CardContainer>
      </div>
    )
  } else {
    // TODO: 가게 없음 Hero 구현할 것
    return (<></>)
  }
}

const RecommendMenu = () => {
  const [menus, setMenus] = useState([])

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/menu/recommend`)
      setMenus(res.data)
    } catch (err) {
      alert('추천 메뉴 목록을 불러오는데 실패했습니다.')
    }
  }, [])

  if (menus.length) {
    return (
      <div>
        <Title>이런 메뉴는 어때요?</Title>
        <CardContainer>
          {
            menus.map(menu => {
              return (
                <MainBox key={menu.uuid}>
                  <Image
                    src={menu.image_url ??
                    'https://source.unsplash.com/600x600/?food'}
                    alt={'food_img'}
                    width={120} height={120}
                    centered
                  />
                  <h3>{menu.name}</h3>
                </MainBox>
              )
            })
          }
          <MainBox key={'random'}>
            <Icon
              circular
              name={'random'} size={'big'}
              className={'box bounce-distortion inpostack-blue2'}
              style={{ margin: 'auto' }}
            />
            <h3>Random Pick</h3>
          </MainBox>
        </CardContainer>
      </div>
    )
  } else {
    // TODO: 메뉴 없음 Hero 구현할 것
    return (<></>)
  }
}

const Recommend = () => {
  return (
    <div>
      {
        Math.floor(Math.random() * 10) % 2 ?
          <RecommendStore/> :
          <RecommendMenu/>
      }
    </div>
  )
}

export default Recommend

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
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  align-items: stretch;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }
`