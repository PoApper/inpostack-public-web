import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import axios from 'axios'
import { Icon, Image } from 'semantic-ui-react'
import EmptyStore from './empty-store'

const RecommendStore = ({titleDiv}) => {
  const [storeList, setStoreList] = useState()
  const [randomStoreList, setRandomStoreList] = useState()

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/store/recommend`)
      .then(res => setStoreList(res.data))
      .catch(() => alert(`추천 가게 목록을 불러오는데 실패했습니다.`))
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/store/random`)
      .then(res => setRandomStoreList(res.data))
      .catch(() => alert(`랜덤 가게 목록을 불러오는데 실패했습니다.`))
  }, [])

  if (!storeList || !randomStoreList) {
    return (
      <div>
        {titleDiv}
        <div style={{height: 250}}/>
      </div>
    )
  }

  if (storeList.length && randomStoreList.length) {
    return (
      <div>
        {titleDiv}
        <CardContainer>
          {
            storeList.map(store => {
              return (
                <Link href={`/store/${store.name}`} key={store.uuid} passHref>
                  <MainBox>
                    <Image
                      src={store.image_url ??
                      'https://via.placeholder.com/200?text=InPoStack'}
                      alt={'store_img'}
                      width={120} height={120}
                      centered
                    />
                    <h3>{store.name}</h3>
                  </MainBox>
                </Link>
              )
            })
          }
          {
            randomStoreList.map(randomStore => {
              return (
                <Link href={`/store/${randomStore.name}`} key={randomStore.uuid} passHref>
                  <MainBox>
                    <Icon
                      circular
                      name={'random'} size={'big'}
                      className={'box bounce-distortion inpostack-red2'}
                      style={{ margin: 'auto' }}
                    />
                    <h3>Random Pick</h3>
                  </MainBox>
                </Link>
              )
            })
          }
        </CardContainer>
      </div>
    )
  } else {
    return (
      <EmptyStore/>
    )
  }
}

export default RecommendStore

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