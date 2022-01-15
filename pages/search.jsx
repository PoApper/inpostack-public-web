import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Divider } from 'semantic-ui-react'
import Layout from '../components/layout'
import styled from 'styled-components'

const SearchPage = () => {
  const router = useRouter();
  const { query } = router.query
  const [menuList, setMenuList]= useState([])
  const [storeList, setStoreList] = useState([])

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
      <Grid>
        {
          storeList.map(store => {
              return (
                <Link href={`/store/${store.name}`} key={store.name} passHref>
                  <MainBox>
                    <Information>
                      <h4>{store.name}</h4>
                      <StoreDesc>{store.description}</StoreDesc>
                    </Information>
                  </MainBox>
                </Link>
              )
          })
        }
      </Grid>

      <Divider/>

      <Grid>
        {
          menuList.map(menu => {
            return (
              <Link href={`/store/${menu.name}`} key={menu.name} passHref>
                <MainBox>
                  <Information>
                    <h4>{menu.name}</h4>
                    <StoreDesc>{menu.description}</StoreDesc>
                  </Information>
                </MainBox>
              </Link>
            )
          })
        }
      </Grid>
    </Layout>
  )
}

export default SearchPage

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
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

const Information = styled.div`
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
