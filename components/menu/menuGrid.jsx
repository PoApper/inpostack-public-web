import styled from 'styled-components'
import MenuContainer from './menuContainer'

const MenuGrid = (props) => {
  const categoriesWithMenu = props.categoriesWithMenu;

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
