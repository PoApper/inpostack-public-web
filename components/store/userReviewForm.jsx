import { Button, Form } from 'semantic-ui-react'
import axios from 'axios'
import { useState } from 'react'

const UserReviewForm = () => {
  const [userReviewText, setUserReviewText] = useState('')

  async function submitReview ({ store }) {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/review/reviewer`, {
        content: userReviewText,
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
    <Form reply onSubmit={submitReview}>
      <Form.TextArea
        placeholder={'인포스택을 이용하고, 리뷰를 남겨보세요! 😁'}
        onChange={e => setUserReviewText(e.target.value)}
      />
      <Button content="리뷰 게시" labelPosition="left" icon="edit" primary/>
    </Form>
  )
}

export default UserReviewForm