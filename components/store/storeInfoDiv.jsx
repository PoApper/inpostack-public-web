import React from 'react'
import styled from 'styled-components'
import { Button, Divider, Icon, Image } from 'semantic-ui-react'
import StoreMap from './storeMap';
import axios from 'axios'

const StoreInfoDiv = (props) => {
  const storeInfo = props.storeInfo;

  const addFavorite = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API}/favorite/store/${storeInfo.uuid}`,
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
    axios.delete(`${process.env.NEXT_PUBLIC_API}/favorite/store/${storeInfo.uuid}`,
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
    <StoreInfoContainer>
      <StoreLogo>
        <h3 style={{ display: 'flex', alignItems: 'center' }}>
          {storeInfo.name}
          <Button basic size={'mini'}
                  style={{ padding: '6px', marginLeft: '4px' }}>
            <Icon fitted color={'orange'}
                  name={storeInfo.is_favorite ? 'star' : 'star outline'}
                  onClick={storeInfo.is_favorite ? notFavorite : addFavorite}/>
          </Button>
        </h3>
        <Image
          src={storeInfo.image_url ?? 'https://source.unsplash.com/600x600/?food'}
          alt={'food_img'}
          width={120} height={120}
          centered
        />
      </StoreLogo>
      <StoreInfo>
        <p>
          <Icon name={"call"} /> {storeInfo.phone}
        </p>
        <p>
          <Icon name={"clock"} /> {storeInfo.open_time} ~ {storeInfo.close_time}
        </p>
        <p>
          <Icon name={"home"} /> {storeInfo.address1} {storeInfo.address2}
          <StoreMap address1={storeInfo.address1} />
        </p>
        <Divider/>
        <p>
          {storeInfo.description}
        </p>
      </StoreInfo>
    </StoreInfoContainer>
  )
}

export default StoreInfoDiv;

const StoreInfoContainer = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
  margin-bottom: 1rem;
  grid-gap: 1rem;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const StoreLogo = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-items: center;
  align-items: center;
  flex: 1
`

const StoreInfo = styled.div`
  flex: 2
`