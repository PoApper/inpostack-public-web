import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import styled from 'styled-components'
import { Dropdown, Image, Label } from 'semantic-ui-react'
import Layout from '../../components/layout'
import StoreTypeLogo from '../../components/store/storeTypeLogo'
import { textLengthOverCut } from '../../utils/text-length-over-cut'

import StoreTypeList from '../../assets/StoreTypeList'
import {
  StoreRegionColor,
  StoreRegionKorean,
} from '../../assets/StoreRegionType'

const StoreIndexPage = () => {
  const [stores, setStores] = useState([])
  const [selectedStoreType, setStoreType] = useState('all')
  const [order, setOrder] = useState('visit')

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/store?order=${order}`).
      then(res => setStores(res.data)).
      catch(() => alert(`가게 목록을 불러오는데 실패했습니다.`))
  }, [order])

  return (
    <Layout>
      <Head>
        <title>가게 목록 | InPoStack</title>
      </Head>
      <StoreTitle>
        <Title>가게 목록</Title>
        <Dropdown
          selection
          options={[
            { key: 'name', text: '이름순', value: 'name' },
            { key: 'visit', text: '방문자순', value: 'visit' },
            { key: 'distance', text: '거리순', value: 'distance' },
          ]}
          onChange={(e, { value }) => setOrder(value?.toString())}
          style={{ marginBottom: '10px' }}
          value={order}
        />
      </StoreTitle>

      <StoreTypesList>
        {
          StoreTypeList.map(store => {
            return (
              <StoreCheck key={store.description}
                          onClick={() => setStoreType(store.storeType)}>
                <StoreTypeLogo storeLogo={store.storeLogo}
                               description={store.description}
                               storeType={store.storeType}/>
              </StoreCheck>
            )
          })
        }
      </StoreTypesList>

      <StoreGrid>
        {
          stores.map(store => {
            if (selectedStoreType === 'all' || store.store_type ===
              selectedStoreType) {
              return (
                <Link href={`/store/${store.name}`} key={store.uuid} passHref>
                  <MainBox>
                    <StoreImage>
                      <Image
                        src={store.image_url ??
                          'https://via.placeholder.com/200?text=InPoStack'}
                        alt={'food_img'}
                        width={120} height={120}
                        centered
                      />
                    </StoreImage>

                    <StoreInfo>
                      <h4 style={{display: 'flex', alignItems: 'center'}}>
                        {
                          textLengthOverCut(
                            store.name,
                            store.region ? (14 - store.region.length) : 20,
                            '…'
                          )
                        }
                        {
                          store.region ? (
                            <Label
                              style={{
                                marginLeft: 8, color: 'white',
                                backgroundColor: StoreRegionColor[store.region]
                            }}>
                              {StoreRegionKorean[store.region]}
                            </Label>
                          ) : null
                        }
                      </h4>
                      <StoreDesc>{store.description}</StoreDesc>
                    </StoreInfo>
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

export default StoreIndexPage

const Title = styled.h2`
  letter-spacing: -1px;
`

const StoreTitle = styled.div`
  display: flex;
  justify-content: space-between;
`

const StoreCheck = styled.button`
  all: unset;
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

  cursor: pointer;
  display: flex;
  flex-direction: row;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 20%);
  }

  h6 {
    color: #888;
    font-size: 12px;
    margin: 5px 0 0;
  }
`

const StoreImage = styled.div`
  flex-shrink: 0;
  margin-right: 12px;
`

const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
`

const StoreDesc = styled.p`
  font-size: 14px;
  color: gray;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
