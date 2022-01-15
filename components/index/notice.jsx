import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import { useEffect, useState } from 'react'
import axios from 'axios'

const Notice = () => {
  const [notices, setNotices] = useState([])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/notice`)
      .then(res => setNotices(res.data))
      .catch(() => alert(`공지를 불러오는데 실패했습니다.`))
  }, [])

  const NoticeRow = ({ title, content }) => {
    return (
      <Grid.Row stretched>
        <Grid.Column>
          <MainBox>
            <h3>{title}</h3>
            <p><ReactMarkdown>{content}</ReactMarkdown></p>
          </MainBox>
        </Grid.Column>
      </Grid.Row>)
  }

  return (
    <div>
      <NoticeTitle>안내드립니다!</NoticeTitle>
      <Grid stackable>
        {
          notices.map(notice => {
            return NoticeRow(notice)
          })
        }
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