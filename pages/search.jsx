import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Divider, Image } from 'semantic-ui-react'
import Layout from '../components/layout'
import styled from 'styled-components'
import MenuCard from '../components/menu/menuCard'
import Head from 'next/head'

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query
  const [storeList, setStoreList] = useState([])
  const [menuList, setMenuList]= useState([])

  useEffect(() => {
    if (!query) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/market-search?search=${query}`)
      .then(res => {
        setMenuList(res.data.Menus);
        setStoreList(res.data.Stores);
      })
      .catch(() => alert('검색에 실패했습니다.'))
  }, [query])

  return (
    <Layout>
      <Head>
        <title>가게·메뉴 검색 | InPoStack</title>
      </Head>
      <p>
        검색어 &ldquo;{query}&rdquo;에 대한 결과 입니다.
      </p>

      <h2>가게 검색 결과</h2>
      <StoreGrid>
        {
          storeList.map(store => {
              return (
                <Link href={`/store/${store.name}`} key={store.name} replace={true} passHref>
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
                      <h4>{store.name}</h4>
                      <StoreDesc>{store.description}</StoreDesc>
                    </StoreInfo>
                  </MainBox>
                </Link>
              )
          })
        }
      </StoreGrid>

      <Divider/>

      <h2>메뉴 검색 결과</h2>
      <MenuGrid>
        {
          menuList.map(menu => {
            return (
              <Link href={`/store/${menu.store_name}`} key={menu.name} passHref>
                <MainBox style={{padding: 10, display: 'flex', flexDirection: 'column'}}>
                  <MenuCard
                    menu={menu}
                    store_name={menu.store_name}
                  />
                </MainBox>
              </Link>
            )
          })
        }
      </MenuGrid>
    </Layout>
  )
}

export default SearchPage

const StoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  align-items: stretch;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(1, 1fr);
  }
`
const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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
