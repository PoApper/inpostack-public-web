import React from 'react'
import RecommendStore from './recommendStore'
import RecommendMenu from './recommendMenu'

const RecommendDiv = () => {
  return (
    <div>
      {
        Math.floor(Math.random() * 10) % 2 ?
          <RecommendStore/> :
          <RecommendMenu/>
      }
    </div>
  )
}

export default RecommendDiv