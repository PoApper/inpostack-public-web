import Layout from '../../components/layout'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { Image } from 'semantic-ui-react'
import styled from 'styled-components'

const UserFavoritePage = () => {
  const [storeList, setStoreList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/xxx`).
      then(res => setStoreList(res.data)).
      catch((err) => console.log(err))
  })

  return (
    <Layout>
      <h2>관심 가게</h2>
      <div>
        {
          storeList.length === 0 ? (
            <>
              <Image
                src={'/empty_street.svg'} alt={'empty'}
                centered size={'large'}/>
              <h3 style={{textAlign: 'center'}}>
                자주 찾는 가게를 모아보세요!
              </h3>
            </>
          ) : (
            storeList.map(store => {
              return (
                <Link href={`/store/${store.name}`} key={store.uuid} passHref>
                  <MainBox>
                    <StoreImage>
                      <Image
                        src={store.image_url ??
                          'https://source.unsplash.com/600x600/?food'}
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
          )
        }
      </div>
    </Layout>
  )
}

export default UserFavoritePage

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
