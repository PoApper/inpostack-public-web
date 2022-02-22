import React from 'react'
import styled from 'styled-components'

const StoreTypeList = ({ storeLogo, description }) => {
  return(
  <LogoDiv>
    <StoreLogoImg src={storeLogo} />
    <p>{description}</p>
  </LogoDiv>
  );
}

export default StoreTypeList;

const LogoDiv = styled.div`
  text-align: center;
  cursor: pointer;
`

const StoreLogoImg = styled.img`
  width: 48px;
  height: 48px;
`