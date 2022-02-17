import Head from 'next/head'
import React from 'react'

const LoginLayout = ({ children }) => {
  return (
    <div>
      <Head>
        <title>InPoStack</title>
        <meta name="description" content="InPoStack, 포스테키안의 맛집 리스트"/>
        <link rel="icon" href={"/favicon.ico"}/>
      </Head>

      <main>
        <div className="Wrapper" style={Wrapper}>{children}</div>
      </main>
    </div>
  )
}

const Wrapper = {
  height: "calc(100vh - 500)",
  width: '60rem',
  paddingTop: '10vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 auto 0'
}

export default LoginLayout