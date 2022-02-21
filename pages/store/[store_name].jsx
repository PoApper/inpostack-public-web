import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Message } from 'semantic-ui-react'

import Layout from '../../components/layout'
import MenuGrid from '../../components/menu/menuGrid'
import StoreInfoDiv from '../../components/store/storeInfoDiv'
import ReviewList from '../../components/store/reviewList'
import RecommendStore from '../../components/index/recommendStore'

const StorePage = () => {
  const router = useRouter()
  const { store_name } = router.query
  const [storeWithAll, setStoreWithAll] = useState()

  useEffect(() => {
    if (!store_name) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_API}/store/name/${store_name}?category=true&menu=true`,
        {withCredentials: true})
      .then(res => setStoreWithAll(res.data))
      .catch(() => alert(`가게 정보를 불러오는데 실패했습니다.`))
  }, [store_name])

  return (
    <Layout>
      {
        storeWithAll ? (
          <>
            <StoreInfoDiv storeInfo={storeWithAll}/>
            <Message floating>
              <Message.Header>📢InPoStack에 안내드립니다!</Message.Header>
              <p>
                InPoStack은 포항공대 학생들의 제보로 운영되는 맛집 사이트 입니다. 🍴
                운영에 최선을 다하고 있지만 가게와 메뉴의 최신 정보를 반영하지 못 할 수도 있습니다. 🙏
                가게·메뉴 정보에서 <span className={"blurry-text"}>정보 수집중</span> 흐릿하게
                표시된 부분은 InPoStack 맛집 데이터베이스에 정보가 없는 항목 입니다. 😢
                &ldquo;<a href={process.env.NEXT_PUBLIC_REQUEST_GOOGLE_FORM_URL}
                          target={"_blank"} rel={'noreferrer'}>
                InPoStack 맛집 정보 수정 요청</a>&rdquo;에
                제보해주시면 감사하겠습니다. 🙌
              </p>
            </Message>

            <MenuGrid categoriesWithMenu={storeWithAll.category}/>

            <ReviewList store={storeWithAll}/>

            <div style={{margin: "3rem 0"}}>
              <RecommendStore/>
            </div>
          </>
        ) : (
          <>
            <h1>해당 가게는 존재하지 않습니다.</h1>
          </>
        )
      }
    </Layout>
  )
}

export default StorePage
