import styled from 'styled-components';

import Layout from '../components/layout';
import Recommend from '../components/index/recommend'
import Notice from '../components/index/notice'
import { InPoStackText } from '../components/common/title'
import CardDiv from '../components/index/cardDiv'

export default function Home() {
  return (
    <Layout>
      <Title>
        <InPoStackText/> - 행복한 배달 생활의 시작
      </Title>
      <IndexDiv>
        <Recommend/>
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
