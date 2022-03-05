import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Divider, Icon, Image } from 'semantic-ui-react'
// import StoreMap from './storeMap';
import axios from 'axios'
import { isBlurry } from '../../utils/blurry-check'

const StoreInfoDiv = ({ storeInfo }) => {
  const uuid = storeInfo.uuid

  const [storeImageLinkList, setStoreImageLinkList] = useState([])

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API}/store-image/${uuid}`).
      then(res => setStoreImageLinkList(res.data)).
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
          storeImageLinkList.map(link => {
            return (
              <StoreImageDiv key={link}>
                <Image
                  src={link ??
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

      <div>
        <p>
          <Icon name={'call'}/>
          {
            isBlurry(storeInfo.phone) ? (
              <span className={'blurry-text'}>정보 수집중</span>
            ) : (
              <span> {storeInfo.phone}</span>
            )
          }
        </p>
        <p>
          <Icon name={'home'}/>
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

          {/* TODO: 클릭하면 펼쳐보이게 */}
          {/*<StoreMap address1={storeInfo.address1} />*/}
        </p>
        <p>
          <Icon name={'clock'}/>
          {
            isBlurry(storeInfo.open_time) || isBlurry(storeInfo.close_time) ? (
              <span className={'blurry-text'}>정보 수집중</span>
            ) : (
              <span>{storeInfo.open_time} ~ {storeInfo.close_time}</span>
            )
          }
        </p>
        <p>
          <Icon name={'question circle'}/>
          <a href={process.env.NEXT_PUBLIC_STORE_OWNER_GOOGLE_FORM_URL}
             target={'_blank'} rel={'noreferrer'}>
            이 식당의 소유주이신가요?
          </a>
        </p>
        <Divider/>
        <p>
          {storeInfo.description}
        </p>
      </div>
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