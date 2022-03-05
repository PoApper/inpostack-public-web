import { Image } from 'semantic-ui-react'
import React from 'react'

const EmptyStore = () => {
  return (
    <div style={{ textAlign: 'center' }}>
      <Image src={'/late_night.svg'} alt={'late_night'} width={180} centered/>
      <h3 style={{ fontSize: 20 }}>
        운영 중인 가게가 없습니다.
      </h3>
    </div>
  )
}

export default EmptyStore