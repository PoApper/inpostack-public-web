import Link from 'next/link'
import styled from 'styled-components'
import { Button, Grid, Icon, Image } from 'semantic-ui-react'
import { InPoStackText } from '../common/title'

const CardDiv = () => {
  return (
    <div>
      <Grid columns={2} stackable>
        <Grid.Row stretched>
          <Grid.Column>
            <Link href={'/store'}>
              <CardBox>
                <CardTextDiv>
                  <h2><InPoStackText/>으로 배달 시켜 먹자!</h2>
                  <TagP>
                    #개꿀맛 #이런_맛집이?
                  </TagP>
                  <CardButton>
                    배달 <Icon name={'arrow right'}/>
                  </CardButton>
                </CardTextDiv>
                <Image centered src={'/inpostack-logo.svg'} alt="logo"
                       style={{
                         height: '200px',
                         float: 'right',
                         marginRight: '80px',
                       }}
                />
              </CardBox>
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Link href={'/in-postech'}>
              <CardBox>
                <CardTextDiv>
                  <h2>학식, 버거킹 GoGo</h2>
                  <TagP>
                    #근본_와퍼 #가성비_ㅅㅌㅊ #포식이
                  </TagP>
                  <CardButton>
                    In POSTECH? <Icon name={'arrow right'}/>
                  </CardButton>
                </CardTextDiv>
                <Image
                  src={'https://popo.poapper.com/static/media/jigok.a2009d3b.jpg'}
                  height={200}
                  style={{ float: 'right' }}
                />
              </CardBox>
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default CardDiv

const CardTextDiv = styled.div`
  padding: 0.5rem;
`

const CardButton = styled(Button)`
  background-color: black !important;
  color: white !important;
  border-radius: 42px !important;
`

const CardBox = styled.div`
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  padding: 25px 24px 25px;
  transition: all 200ms;
  cursor: pointer;
`

const TagP = styled.p`
  color: grey;
`