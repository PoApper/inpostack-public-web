import { useEffect, useState } from 'react'
import axios from 'axios'
import { Comment, Divider, Header } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'
import UserReviewForm from '../store/userReviewForm'

const ReviewList = (props) => {
  const [reviewList, setReviewList] = useState([])
  const store = props.store

  useEffect(() => {
    if (!store) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/review/store/${store.uuid}`)
      .then(res => setReviewList(res.data))
      .catch(() => alert(`리뷰 목록을 불러오는데 실패했습니다.`))
  }, [store])

  return (
    <CommentDiv>
      <Header>리뷰</Header>
      <Comment>
        <Comment.Content>
          <Comment.Text>
            (예시 리뷰) 80년 전통의 맛집 인정합니다 💪
          </Comment.Text>
          <Comment.Metadata>
            <div>Today at 5:42PM</div>
          </Comment.Metadata>
        </Comment.Content>
      </Comment>
      {
        reviewList.map(review => {
          return (
            <Comment key={review.uuid} style={{marginTop: 8}}>
              <Comment.Content>
                <Comment.Text>
                  {review.content}
                </Comment.Text>
                <Comment.Metadata>
                  <div>{moment(review.created_at).format('YYYY-MM-DD hh:mm')}</div>
                </Comment.Metadata>
              </Comment.Content>
            </Comment>
          )
        })
      }

      <Divider/>

      <UserReviewForm store={store}/>

    </CommentDiv>
  )
}

export default ReviewList

const CommentDiv = styled.div`
  width: 100%;
  margin: 3rem 0;
`