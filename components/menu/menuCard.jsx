import styled from 'styled-components'
import { Button, Icon } from 'semantic-ui-react'
import axios from 'axios'

// TODO: show menu like/hate

const MenuCard = (props) => {
  const menu = props.menu

  const thumbsUp = async () => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API}/menu/${menu.uuid}/5`,
        {}, { withCredentials: true })
      alert('평가가 반영되었습니다!')
      window.location.reload()
    } catch (err) {
      const status = err.response.status
      if (status === 403) {
        alert('로그인 후 평가해주세요!')
      } else {
        alert('메뉴를 평가하는데 실패했습니다')
      }
      console.log(err)
    }

  }

  const thumbsDown = async () => {
    try {
      await axios.patch(`${process.env.NEXT_PUBLIC_API}/menu/${menu.uuid}/0`,
        {}, { withCredentials: true })
      alert('평가가 반영되었습니다!')
      window.location.reload()
    } catch (err) {
      const status = err.response.status
      if (status === 403) {
        alert('로그인 후 평가해주세요!')
      } else {
        alert('메뉴를 평가하는데 실패했습니다')
      }
      console.log(err)
    }
  }

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
        <div>
          <Button basic size="mini">
            <Icon name={'thumbs up outline'} color="red"
                  onClick={thumbsUp}/>
            {menu.like}
          </Button>
          <Button basic size="mini">
            <Icon name={'thumbs down outline'} color="blue"
                  onClick={thumbsDown}/>
            {menu.hate}
          </Button>
        </div>
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
