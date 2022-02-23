import styled from 'styled-components'
import { Image } from 'semantic-ui-react'

const MenuCard = (props) => {
  const menu = props.menu

  return (
    <MenuInfo key={menu.uuid}>
      <ImageColumn>
        <Image src={menu.image_url ?? 'https://via.placeholder.com/100'}
               alt={`${menu.name}_photo`}
               width={160} height={160}
               rounded
               style={{ marginBottom: 10, minWidth: '160'}}/>
      </ImageColumn>

      <div>
        <h3 style={{marginBottom: 10}}>
          {menu.name}
        </h3>
        <PriceText>
          {menu.price.toLocaleString()}원
        </PriceText>
      </div>
    </MenuInfo>
  )
}

export default MenuCard

const MenuInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: white;
  align-content: center;
  justify-content: center;
`

const PriceText = styled.p`
  font-size: 16px;
`

const ImageColumn = styled.div`
  margin-bottom: 12px;
  width: 100%;
`
