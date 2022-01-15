import React from 'react'
import styled from 'styled-components'
import { Divider, Icon, Image } from 'semantic-ui-react'

const StoreInfoDiv = (props) => {
  const storeInfo = props.storeInfo;

  return (
    <StoreInfoContainer>
      <StoreLogo>
        <h3>{storeInfo.name}</h3>
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
          <Icon name={"home"} /> {storeInfo.address1} {storeInfo.address2}
        </p>
        <p>
          <Icon name={"clock"} /> {storeInfo.open_time} ~ {storeInfo.close_time}
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
  grid-template-columns: 1fr 3fr;
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