import React from 'react'
import styled from 'styled-components'

import RecommendStore from './recommendStore'
import RecommendMenu from './recommendMenu'

const RecommendDiv = () => {
  const isStoreRecommend = Math.floor(Math.random() * 10) % 2
  return (
    <div>
      {
        isStoreRecommend ?
          <div>
            <RecommendStore
              titleDiv={<Title>오늘은 여기 어때요?</Title>}/>
          </div>
          :
          <div>
            <RecommendMenu
              titleDiv={<Title>이런 메뉴는 어때요?</Title>}/>
          </div>
      }
    </div>
  )
}

export default RecommendDiv

const Title = styled.h2`
  margin-bottom: 1rem;
`