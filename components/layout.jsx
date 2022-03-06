import styled, { ThemeProvider } from 'styled-components'
import theme from '../styles/theme'

import Navbar from './navbar/navbar'
import Footer from './footer'

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
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