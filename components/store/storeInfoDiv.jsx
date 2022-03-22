import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Divider, Icon, Image, List } from 'semantic-ui-react'
import axios from 'axios'
// import StoreMap from './storeMap';
import { isBlurry } from '../../utils/blurry-check'
import StoreOpeningHours from './StoreOpeningHours'

const StoreInfoDiv = ({ storeInfo }) => {
  const uuid = storeInfo.uuid

  const [storeImageList, setStoreImageList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/store-image/${uuid}`).
      then(res => setStoreImageList(res.data)).
      catch((err) => console.log(err))
  }, [uuid])

  const addFavorite = () => {
    axios.post(
      `${process.env.NEXT_PUBLIC_API}/favorite/store/${storeInfo.uuid}`,
      {}, { withCredentials: true }).then(() => {
      alert('즐겨찾기에 추가 되었습니다!')
      window.location.reload()
    }).catch(err => {
      const status = err.response.status
      if (status === 403) {
        alert('로그인 후 평가해주세요!')
      } else {
        alert('즐겨찾기에 추가하는데 실패했습니다')
      }
      console.log(err)
    })
  }

  const notFavorite = () => {
    axios.delete(
      `${process.env.NEXT_PUBLIC_API}/favorite/store/${storeInfo.uuid}`,
      { withCredentials: true }).then(() => {
      alert('즐겨찾기에서 제거 되었습니다!')
      window.location.reload()
    }).catch(err => {
      const status = err.response.status
      if (status === 403) {
        alert('로그인 후 평가해주세요!')
      } else {
        alert('즐겨찾기에서 제거하는데 실패했습니다')
      }
      console.log(err)
    })
  }

  return (
    <div>
      <StoreHeader>
        <h3 style={{ fontSize: 32 }}>
          {storeInfo.name}
        </h3>

        <div>
          <Button basic>
            <Icon fitted color={'orange'}
                  name={storeInfo.is_favorite ? 'star' : 'star outline'}
                  onClick={storeInfo.is_favorite ? notFavorite : addFavorite}/>
            <span style={{ marginLeft: 4 }}>
              {Number(storeInfo.favorite_count).toLocaleString()}
            </span>
          </Button>
        </div>
      </StoreHeader>

      <StoreImageGrid>
        {
          storeImageList.map(storeImage => {
            return (
              <StoreImageDiv key={storeImage.uuid}>
                <Image
                  src={storeImage.link ??
                    'https://via.placeholder.com/200?text=InPoStack'}
                  alt={'food_img'}
                  width={200} height={200}
                />
              </StoreImageDiv>
            )
          })
        }
      </StoreImageGrid>

      <Divider/>

      <List>
        <List.Item>
          <List.Icon name={'call'} style={{width: 16}}/>
          <List.Content>
            {
              isBlurry(storeInfo.phone) ? (
                <span className={'blurry-text'}>정보 수집중</span>
              ) : (
                <span> {storeInfo.phone}</span>
              )
            }
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name={'home'} style={{fontSize: '16px !important', height: '16px !important'}}/>
          <List.Content>
          {
            isBlurry(storeInfo.address1) ? (
              <span className={'blurry-text'}>정보 수집중</span>
            ) : (
              storeInfo.naver_map_url ? (
                <a href={storeInfo.naver_map_url} target={'_blank'}
                   rel={'noreferrer'}>
                  {storeInfo.address1} {storeInfo.address2}
                </a>
              ) : (
                <span>
                  {storeInfo.address1} {storeInfo.address2}
                </span>
              )
            )
          }
          </List.Content>
          {/* TODO: 클릭하면 펼쳐보이게 */}
          {/*<StoreMap address1={storeInfo.address1} />*/}
        </List.Item>
        <List.Item>
          <List.Icon name={'clock'}/>
          <List.Content>
            {
              isBlurry(storeInfo.opening_hours) ? (
                <span className={'blurry-text'}>정보 수집중</span>
              ) : (
                <StoreOpeningHours
                  openingHours={storeInfo.opening_hours}
                />
              )
            }
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Icon name={'question circle'}/>
          <List.Content>
            <a href={process.env.NEXT_PUBLIC_STORE_OWNER_GOOGLE_FORM_URL}
               target={'_blank'} rel={'noreferrer'}>
              이 식당의 소유주이신가요?
            </a>
          </List.Content>
        </List.Item>

        <Divider/>
        <p>
          {storeInfo.description}
        </p>
      </List>
    </div>
  )
}

export default StoreInfoDiv

const StoreHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

const StoreImageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }

  margin-left: -10px;
  margin-right: -10px;
`

const StoreImageDiv = styled.div`
  padding: 10px;
`