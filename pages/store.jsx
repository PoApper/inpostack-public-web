import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styled from 'styled-components'
import { Image } from 'semantic-ui-react'

import Layout from '../components/layout'

const Store = () => {
  const [stores, setStores] = useState([])
  const [selectedStoreType, setStoreType] = useState('all')

  useEffect(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/store`)
      setStores(res.data)
    } catch (err) {
      alert('가게 목록을 불러오는데 실패했습니다.')
    }
  }, [])

  return (
    <Layout>
      <Title>가게 목록</Title>
      <StoreTypesList>
        <LogoDiv onClick={() => setStoreType('all')}>
          <StoreLogoImg src={'/inpostack-logo.svg'}/>
          <p>전체보기</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('KOREAN_STEW')}>
          <StoreLogoImg src={'/store_logo/된장찌개.svg'}/>
          <p>찌개</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('DESSERT')}>
          <StoreLogoImg src={'/store_logo/디저트.svg'}/>
          <p>디저트</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('SNACK_SHOP')}>
          <StoreLogoImg src={'/store_logo/떡볶이.svg'}/>
          <p>분식</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('SEA_FOOD')}>
          <StoreLogoImg src={'/store_logo/물고기.svg'}/>
          <p>해산물</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('KOREAN')}>
          <StoreLogoImg src={'/store_logo/밥.svg'}/>
          <p>정식</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('BOSSAM')}>
          <StoreLogoImg src={'/store_logo/보쌈.svg'}/>
          <p>고기/보쌈</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('WESTERN')}>
          <StoreLogoImg src={'/store_logo/스테이크.svg'}/>
          <p>양식</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('CHINESE')}>
          <StoreLogoImg src={'/store_logo/짜장면.svg'}/>
          <p>중식</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('JAPANESE')}>
          <StoreLogoImg src={'/store_logo/초밥.svg'}/>
          <p>일식</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('CHICKEN')}>
          <StoreLogoImg src={'/store_logo/치킨.svg'}/>
          <p>치킨</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('PIZZA')}>
          <StoreLogoImg src={'/store_logo/피자.svg'}/>
          <p>피자</p>
        </LogoDiv>
        <LogoDiv onClick={() => setStoreType('HAMBURGER')}>
          <StoreLogoImg src={'/store_logo/햄버거.svg'}/>
          <p>햄버거</p>
        </LogoDiv>
      </StoreTypesList>
      <StoreGrid>
        {
          stores.map(store => {
            if(selectedStoreType === 'all' || store.store_type === selectedStoreType) {
              return (
                <Link href={`/store/${store.name}`} key={store.uuid}>
                  <MainBox>
                    <Image
                      src={store.image_url ?? 'https://source.unsplash.com/600x600/?food'}
                      alt={'food_img'}
                      width={120} height={120}
                      centered
                    />
                    <h4>{store.name}</h4>
                  </MainBox>
                </Link>
              )
            }
          })
        }
      </StoreGrid>
    </Layout>
  )
}

export default Store

const Title = styled.h2`
  letter-spacing: -1px;
`

const StoreTypesList = styled.div`
  display: grid;
  grid-template-columns: repeat(13, 1fr);
  margin: 2rem 0;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.m}) {
    grid-template-columns: repeat(8, 1fr);
  }
  
  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(5, 1fr);
  }
`

const LogoDiv = styled.div`
  text-align: center;
  cursor: pointer;
`

const StoreLogoImg = styled.img`
  width: 48px;
  height: 48px;
`

const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  align-items: stretch;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const MainBox = styled.div`
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  padding: 25px 24px 25px;
  transition: all 200ms;
  text-align: center;

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