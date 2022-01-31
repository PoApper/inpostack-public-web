import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import axios from 'axios'

const MenuCard = (props) => {
  const menu = props.menu

  const addFavorite = () => {
    axios.post(`${process.env.NEXT_PUBLIC_API}/favorite/menu/${menu.uuid}`,
      {}, { withCredentials: true }).then(() => {
      alert('즐겨찾기에 추가 되었습니다!')
      window.location.reload()
    }).catch(err => {
      const status = err.response.status
      if (status === 403) {
        alert('로그인 후 평가해주세요!')
      } else {
        alert('메뉴를 즐겨찾기에 추가하는데 실패했습니다')
      }
      console.log(err)
    })
  }

  const notFavorite = () => {
    axios.delete(`${process.env.NEXT_PUBLIC_API}/favorite/menu/${menu.uuid}`,
        { withCredentials: true }).then(() => {
      alert('즐겨찾기에서 제거 되었습니다!')
      window.location.reload()
    }).catch(err => {
      const status = err.response.status
      if (status === 403) {
        alert('로그인 후 평가해주세요!')
      } else {
        alert('메뉴를 즐겨찾기에서 제거하는데 실패했습니다')
      }
      console.log(err)
    })
  }

  return (
    <CardDiv key={menu.uuid}>
      <InfoColumn>
        <MenuText style={{ display: 'flex', alignItems: 'center' }}>
          {menu.name}
          <Button basic size={'mini'}
                  style={{ padding: '6px', marginLeft: '4px' }}>
            <Icon fitted color={'orange'}
                  name={menu.is_favorite ? 'star' : 'star outline'}
                  onClick={menu.is_favorite ? notFavorite : addFavorite}/>
          </Button>
        </MenuText>
        <DescriptionText>
          {menu.description}
        </DescriptionText>
        <PriceText>
          {menu.price.toLocaleString()}원
        </PriceText>
      </InfoColumn>
      <ImageColumn>
        <img src={menu.image_url ?? 'https://via.placeholder.com/100'}
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

  transition: all 200ms;

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
  font-size: 16px;
`

const DescriptionText = styled.p`
  flex: 1;
  color: grey;
`

const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
`

const ImageColumn = styled.div`
  margin-left: auto;
`
