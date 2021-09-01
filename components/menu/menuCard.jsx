import styled from 'styled-components'

const MenuCard = (props) => {
  const menu = props.menu

  return (
    <CardDiv key={menu.uuid}>
      <InfoColumn>
        <MenuText>{menu.name}</MenuText>
        <DescriptionText>
          {menu.description}
        </DescriptionText>
        <PriceText>
          {menu.price.toLocaleString()}원
        </PriceText>
        <Rating>
          {/*  /!*<FaThumbsUp color="red"/> {menu.like}*!/*/}
          &nbsp;&nbsp;
          {/*  /!*<FaThumbsDown color="blue"/> {menu.hate}*!/*/}
        </Rating>
      </InfoColumn>
      <ImageColumn>
        <img src="https://via.placeholder.com/100"
             alt={`${menu.name}_photo`}
             width={100} height={100}
             style={{ marginBottom: '0.6rem' }}/>
      </ImageColumn>
    </CardDiv>
  )
}

export default MenuCard

const CardDiv = styled.div`
  display: flex;
  flex-direction: row;
  padding: 1rem;
  background-color: white;

  border-radius: 10px;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 6%);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 12%);
  }
`

const MenuText = styled.h4`
  font-size: 20px;
  margin: 0 0 5px 0;
`

const PriceText = styled.p`
  font-weight: 700;
  font-size: 14px;
  margin: 0;
`

const DescriptionText = styled.p`
  margin: 0;
  color: grey;
`

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageColumn = styled.div`
  margin-left: auto;
`

const Rating = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  column-gap: 0.4rem;
`