import styled from 'styled-components'
import MenuContainer from './menuContainer'
import { Image } from 'semantic-ui-react'
import React from 'react'

const MenuGrid = ({ categoriesWithMenu }) => {

  if (categoriesWithMenu.length) {
    return (
      <MenuWrapper>
        <MenuArea>
          {
            categoriesWithMenu.map(categoryWithMenu => {
              return (
                <MenuContainer
                  key={categoryWithMenu.uuid}
                  categoryWithMenu={categoryWithMenu}/>
              )
            })
          }
        </MenuArea>
      </MenuWrapper>
    )
  }
  else {
    return (
      <MenuWrapper>
        <Image src={'/tasting.svg'} alt={'tasting'} width={500} centered/>

        <p style={{marginTop: 20}}>
          아직 가게에 등록된 메뉴 정보가 없습니다 😢
          &ldquo;<a href={process.env.NEXT_PUBLIC_REPORT_GOOGLE_FORM_URL}
                   target={'_blank'} rel={'noreferrer'}>
          InPoStack 맛집 제보</a>&rdquo;
          링크를 통해 맛있게 먹은 메뉴를 직접 제보할 수도 있습니다 😋
          InPoStack 팀에서 맛집을 방문하고 맛집 정보를 수집하고 있으니 조금만 기다려주세요! 🙏
        </p>
      </MenuWrapper>
    )
  }
}

export default MenuGrid

const MenuWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 1rem;
`

const MenuArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0 30px;
  gap: 1rem;
`
