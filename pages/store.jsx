import Layout from '../components/layout'
import styled from 'styled-components'
import StoreUpdateForm from '../components/store/store_update_form'

const Store = () => {
  return (
    <Layout>
      <Title>가게 정보 수정</Title>
      <StoreUpdateForm/>
    </Layout>
  )
}

export default Store

const Title = styled.h2`
  letter-spacing: -1px;
`