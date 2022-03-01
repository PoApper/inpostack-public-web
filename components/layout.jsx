import Head from 'next/head'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

import Navbar from './navbar/navbar'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>InPoStack</title>
        <meta name="description" content="InPoStack, 포스테키안의 맛집 리스트"/>
        <link rel="icon" href={'/favicon.ico'}/>
      </Head>
      {
        <>
          <Navbar/>
          <main>
            <Wrapper>
              <div style={{ width: '100%' }}>
                {children}
              </div>
            </Wrapper>
          </main>
          <Footer/>
        </>
      }
    </ThemeProvider>
  )
}

const Wrapper = styled.div`
  height: 100%;
  min-height: calc(100vh - ${({ theme }) => theme.footerHeight});
  max-width: ${({ theme }) => theme.contentWidth};
  padding: 8rem 1rem 2rem;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export default Layout