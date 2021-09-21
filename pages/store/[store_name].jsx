import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import Layout from '../../components/layout'
import MenuGrid from '../../components/menu/menuGrid'
import StoreInfoDiv from '../../components/store/storeInfoDiv'
import ReviewList from '../../components/store/reviewList'

const StorePage = () => {
  const router = useRouter()
  const { store_name } = router.query
  const [storeWithAll, setStoreWithAll] = useState()

  useEffect(async () => {
    try {
      if (store_name) {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API}/store/name/${store_name}?category=true&menu=true`)
        setStoreWithAll(res.data)
      }
    } catch (err) {
      alert('가게 정보를 불러오는데 실패했습니다.')
    }
  }, [store_name])

  console.log(storeWithAll)

  return (
    <Layout>
      {
        storeWithAll ? (
          <>
            <StoreInfoDiv storeInfo={storeWithAll}/>
            <MenuGrid categoriesWithMenu={storeWithAll.category}/>
            <ReviewList store={storeWithAll}/>
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
