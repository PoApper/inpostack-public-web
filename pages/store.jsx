import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import styled from 'styled-components'
import { Image } from 'semantic-ui-react'

import Layout from '../components/layout'

const Store = () => {
  const [stores, setStores] = useState([])

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
      <StoreGrid>
        {
          stores.map(store => {
            return (
              <Link href={`/store/${store.name}`} key={store.uuid}>
                <MainBox>
                  <Image
                    src={'https://source.unsplash.com/600x600/?food'}
                    alt={'food_img'}
                    width={120} height={120}
                    centered
                  />
                  <h4>{store.name}</h4>
                </MainBox>
              </Link>

            )
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

const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  align-items: stretch;
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