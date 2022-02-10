import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Comment, Divider, Form, Header } from 'semantic-ui-react'
import moment from 'moment'
import styled from 'styled-components'

const ReviewList = (props) => {
  const [reviewList, setReviewList] = useState([])
  const [userReview, setUserReview] = useState()
  const store = props.store

  useEffect(() => {
    if (!store) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/review/store/${store.uuid}`)
      .then(res => setReviewList(res.data))
      .catch(() => alert(`리뷰 목록을 불러오는데 실패했습니다.`))
  }, [store])

  const submitReview = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/review/reviewer`, {
        content: userReview,
        store_uuid: store.uuid,
      }, { withCredentials: true })
      alert('리뷰가 등록되었습니다!')
      window.location.reload()
    } catch (err) {
      const status = err.response.status
      if (status === 403) {
        alert('로그인 후 리뷰를 이용해주세요!')
      } else {
        alert('리뷰 작성에 실패했습니다.')
      }
      console.log(err)
    }
  }

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
            <Comment key={review.uuid}>
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

      <Form reply onSubmit={submitReview}>
        <Form.TextArea
          placeholder={'인포스택을 이용하고, 리뷰를 남겨보세요! 😁'}
          onChange={e => setUserReview(e.target.value)}
        />
        <Button content="리뷰 게시" labelPosition="left" icon="edit" primary/>
      </Form>
    </CommentDiv>
  )
}

export default ReviewList

const CommentDiv = styled.div`
  width: 100%;
  margin: 1rem 0;
`