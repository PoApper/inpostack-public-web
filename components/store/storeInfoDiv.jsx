import React from 'react'
import styled from 'styled-components'
import { Button, Divider, Icon, Image } from 'semantic-ui-react'
// import StoreMap from './storeMap';
import axios from 'axios'

const StoreInfoDiv = ({ storeInfo }) => {
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
        alert('가게를 즐겨찾기에 추가하는데 실패했습니다')
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
        alert('가게를 즐겨찾기에서 제거하는데 실패했습니다')
      }
      console.log(err)
    })
  }

  return (
    <div>
      <StoreHeader>
        <h3 style={{ display: 'flex', alignItems: 'center', fontSize: 32 }}>
          {storeInfo.name}
        </h3>

        <p style={{ color: 'gray' }}>
          <Button basic>
            <Icon fitted color={'orange'}
                  name={storeInfo.is_favorite ? 'star' : 'star outline'}
                  onClick={storeInfo.is_favorite ? notFavorite : addFavorite}/>
            <span style={{ marginLeft: 4 }}>
              {/* TODO: sync with favorite count */}
              {Number(3456).toLocaleString()}
            </span>
          </Button>
        </p>
      </StoreHeader>

      <StoreImageGrid>
        {
          [1, 2, 3, 4].map((value) => {
            return (
              <StoreImageDiv key={value}>
                <Image
                  src={storeInfo.image_url ??
                    'https://source.unsplash.com/600x600/?food'}
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
          <Icon name={'call'}/> {storeInfo.phone}
        </p>
        <p>
          <Icon name={'home'}/> {storeInfo.address1} {storeInfo.address2}
          {/* TODO: 클릭하면 펼쳐보이게 */}
          {/*<StoreMap address1={storeInfo.address1} />*/}
        </p>
        <p>
          <Icon name={'clock'}/> {storeInfo.open_time} ~ {storeInfo.close_time}
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