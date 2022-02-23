import styled from 'styled-components'
import { Accordion, Icon } from 'semantic-ui-react'
import { useState } from 'react'

import MenuCard from './menuCard'

const MenuContainer = (props) => {
  const categoryWithMenu = props.categoryWithMenu
  const categoryName = categoryWithMenu.name
  const menus = categoryWithMenu.menu

  const [isActive, setActive] = useState(true)

  return (
    <MenuWrapper>
      <Accordion>
        <Accordion.Title
          active={isActive}
          onClick={() => setActive(!isActive)}
        >
          <CategoryTitle>
            <Icon name="dropdown"/>
            {
              `${categoryName} (${menus.length})`
            }
          </CategoryTitle>
        </Accordion.Title>
        <Accordion.Content
          active={isActive}
        >
          <MenuGrid>
            {
              menus.map((menu) => {
                return (
                  <MenuCard
                    key={menu.uuid}
                    menu={menu}
                    categoryInfo={categoryWithMenu}/>
                )
              })
            }
          </MenuGrid>
        </Accordion.Content>
      </Accordion>

    </MenuWrapper>
  )
}

export default MenuContainer

const MenuWrapper = styled.div`
  background-color: white;
  padding-bottom: 10px;
`

const CategoryTitle = styled.h3`
  display: flex;
  padding-top: 10px;
  padding-left: 1rem;
  justify-items: center;
`

const MenuGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.m}) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.s}) {
    grid-template-columns: repeat(2, 1fr);
  }
  padding: 10px;
`