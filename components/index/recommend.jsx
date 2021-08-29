import React from 'react'
import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

const Recommend = () => {
  const getOverviewElement = ({ header }) => {
    return <Grid.Column>
      <MainBox>
        <h3>{header}</h3>
      </MainBox>
    </Grid.Column>
  }

  return (
    <div>
      <Title>이런 메뉴는 어때요?</Title>
      <Grid columns={4} stackable>
        <Grid.Row stretched>
          {getOverviewElement({ header: '순살 후라이드 파닭' })}
          {getOverviewElement({ header: '허니 머스타드 파닭' })}
          {getOverviewElement({ header: '간장 파닭' })}
          {getOverviewElement({ header: '크림머스타드 파닭' })}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Recommend

const Title = styled.h2`
  margin-bottom: 1rem;
`

const MainBox = styled.div`
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  padding: 25px 24px 25px;
  transition: all 200ms;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 20%);
  }

  h6 {
    color: #888;
    font-size: 12px;
    margin: 5px 0 0;
  }

  p {
    font-size: 35px;
    margin: auto;
  }
`