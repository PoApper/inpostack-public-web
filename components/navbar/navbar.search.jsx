import styled from 'styled-components'
import { Input } from 'semantic-ui-react'
import React, { useState } from 'react'
import { useRouter } from 'next/router'

const NavbarSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState("")

  function goToSearchPage(e) {
    if(e.key === 'Enter') {
      router.push(`/search?query=${query}`)
    }
  }

  return (
    <SearchWrapper>
      <Input
        fluid
        placeholder={'내가 원하는 가게/메뉴로! 🚀'}
        icon={{ name: 'search', circular: true, link: true }}
        onChange={e => setQuery(e.target.value)}
        onKeyPress={goToSearchPage}
      />
    </SearchWrapper>
  )
}

export default NavbarSearch

const SearchWrapper = styled.div`
  margin: auto 0;
  width: 400px;

  @media only screen and (max-width: ${({ theme }) => theme.breakpoint.lg}) {
    width: 100%;
  }
`