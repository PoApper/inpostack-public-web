import { Form } from 'semantic-ui-react'
import axios from 'axios'
import { useRouter } from 'next/router'

import Layout from '../components/layout'

const Register = () => {
  const router = useRouter()

  const handleRegister = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API}/auth/register`, {},
        { withCredentials: true })
      alert('InPoStack 가입에 성공했습니다!')
      router.push('/')
    } catch (err) {
      alert('InPoStack 가입에 실패했습니다.')
    }
  }

  return (
    <Layout>
      <h1>InPoStack - 회원가입</h1>
      <Form onSubmit={handleRegister}>
        <Form.Button>
          PoApper SSO로 InPoStack 가입하기
        </Form.Button>
      </Form>
    </Layout>
  )
}
export default Register
