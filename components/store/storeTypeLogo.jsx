import React from 'react'
import styled from 'styled-components'

const StoreTypeLogo = ({ storeLogo, description }) => {
  return(
  <LogoDiv>
    <StoreLogoImg src={storeLogo} />
    <p>{description}</p>
  </LogoDiv>
  );
}

export default StoreTypeLogo;

const LogoDiv = styled.div`
  text-align: center;
  cursor: pointer;
`

const StoreLogoImg = styled.img`
  width: 48px;
  height: 48px;
`