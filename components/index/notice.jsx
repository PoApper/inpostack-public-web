import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'

const Notice = () => {
  const getOverviewElement = ({ header, content }) => {
    return <Grid.Column>
      <MainBox>
        <h3>{header}</h3>
        <p><ReactMarkdown>{content}</ReactMarkdown></p>
      </MainBox>
    </Grid.Column>
  }

  return (
    <div>
      <NoticeTitle>안내드립니다!</NoticeTitle>
      <Grid stackable>
        <Grid.Row stretched>
          {getOverviewElement({
            header: '인포스택 피드백을 받습니다',
            content: '👉[이곳](https://forms.gle/Bs5ws9vwrFfkYjT39)👈에서 베타 버전에 대한 피드백을 받고 있습니다 😉',
          })}
        </Grid.Row>
        <Grid.Row stretched>
          {getOverviewElement({
            header: '인포스택 리뉴얼!',
            content: 'InPoStack이 새단장 하여 오픈하였습니다! (9월 25일 🎉🎊)',
          })}
        </Grid.Row>
        <Grid.Row stretched>
          {getOverviewElement({
            header: '2021-2학기 개강',
            content: '9월 6일, 2021-2학기가 시작됩니다. 코로나19로 인해 비대면으로 개강합니다.',
          })}
        </Grid.Row>
      </Grid>
    </div>
  )
}

export default Notice

const NoticeTitle = styled.h2`
  margin-bottom: 1rem;
`

const MainBox = styled.div`
  border-radius: 14px;
  background-color: #fff;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  padding: 25px 24px 25px;
  transition: all 200ms;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 3px 11px 28px 4px rgb(0 0 0 / 20%);
  }

  h6 {
    color: #888;
    font-size: 12px;
    margin: 5px 0 0;
  }

  p {
    margin: auto;
  }
`