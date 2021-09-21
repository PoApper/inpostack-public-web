import { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Comment, Divider, Form, Header } from 'semantic-ui-react'
import moment from 'moment'

const ReviewList = (props) => {
  const [reviewList, setReviewList] = useState([])
  const [review, setReview] = useState()
  const store = props.store

  useEffect(async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API}/review/store/${store.uuid}`)
      setReviewList(res.data)
    } catch (err) {
      alert('리뷰 목록을 불러오는데 실패했습니다.')
      console.log(err)
    }
  }, store)

  console.log(reviewList)

  const submitReview = async () => {
    console.log('리뷰 제출!!')
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/review/reviewer`, {
        content: review,
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
    <Comment.Group>
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
          onChange={e => setReview(e.target.value)}
        />
        <Button content="리뷰 게시" labelPosition="left" icon="edit" primary/>
      </Form>
    </Comment.Group>
  )
}

export default ReviewList