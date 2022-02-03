import styled from 'styled-components';

import Layout from '../components/layout';
import Notice from '../components/index/notice'
import CardDiv from '../components/index/cardDiv'
import RecommendDiv from '../components/index/recommendDiv'
import { InPoStackText } from '../components/common/title'

export default function IndexPage() {
  return (
    <Layout>
      <Title>
        <InPoStackText/> - 포스테키안의 맛집 리스트
      </Title>
      <IndexDiv>
        <RecommendDiv/>
        <CardDiv/>
        <Notice/>
      </IndexDiv>
    </Layout>
  );
}

const Title = styled.h1`
  letter-spacing: -1px;
`

const IndexDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
