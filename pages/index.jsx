import styled from 'styled-components'

import Layout from '../components/layout'
import Notice from '../components/index/notice'
import CardDiv from '../components/index/cardDiv'
import RecommendDiv from '../components/index/recommendDiv'
import { InPoStackText } from '../components/common/title'
import { Message } from 'semantic-ui-react'

export default function IndexPage () {
  return (
    <Layout>
      <Title>
        <InPoStackText/> - 포스테키안의 맛집 리스트
      </Title>
      <IndexDiv>
        <RecommendDiv/>
        <CardDiv/>
        <Message floating>
          <Message.Header>📢InPoStack에 맛집을 제보하세요!</Message.Header>
          <p>
            InPoStack은 포항공대 학생들의 제보로 운영되는 맛집 사이트 입니다. 🍴
            여러분이 좋아하는 맛집을 인포스택에 제보하세요! 제보하신 분들 중 추첨을 통해 기프티콘을 드립니다.
            &ldquo;<a href={process.env.NEXT_PUBLIC_REQUEST_GOOGLE_FORM_URL}
                       target={'_blank'} rel={'noreferrer'}>
            InPoStack 맛집 제보</a>&rdquo; 링크에
            제보해주시면 감사하겠습니다. 🙌
          </p>
        </Message>
        <Notice/>
      </IndexDiv>
    </Layout>
  )
}

const Title = styled.h1`
  letter-spacing: -1px;
`

const IndexDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
