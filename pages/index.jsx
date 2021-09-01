import styled from 'styled-components';

import Layout from '../components/layout';
import Recommend from '../components/index/recommend'
import Notice from '../components/index/notice'
import { InPoStackText } from '../components/common/title'

export default function Home() {
  return (
    <Layout>
      <Title>
        <InPoStackText/> - 행복한 배달 생활의 시작
      </Title>
      <IndexGrid>
        <Recommend/>
        <Notice/>
      </IndexGrid>
    </Layout>
  );
}

const Title = styled.h1`
  letter-spacing: -1px;
`

const IndexGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
`
