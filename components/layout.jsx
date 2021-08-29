import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from 'axios'
import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

import Navbar from './navbar'
import Footer from './footer'

const Layout = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(async () => {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/auth/verifyToken`,
      { withCredentials: true })

    const _user = res.data
    setUser(_user)
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>InPoStack</title>
        <meta name="description" content="InPoStack 행복한 배달 생활"/>
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