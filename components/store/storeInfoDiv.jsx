import React from 'react'
import styled from 'styled-components'
import { Image } from 'semantic-ui-react'

const StoreInfoDiv = (props) => {
  const storeInfo = props.storeInfo;

  return (
    <StoreInfoContainer>
      <StoreLogo>
        <h3>{storeInfo.name}</h3>
        <Image
          src={'https://source.unsplash.com/600x600/?food'}
          alt={'food_img'}
          width={120} height={120}
          centered
        />
      </StoreLogo>
      <StoreInfo>
        <p>
          {storeInfo.description}
        </p>
        <p>
          {storeInfo.address1}
          {storeInfo.address2}
        </p>
        <p>
          {storeInfo.open_time} ~ {storeInfo.close_time}
        </p>
      </StoreInfo>
    </StoreInfoContainer>
  )
}

export default StoreInfoDiv;

const StoreInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
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