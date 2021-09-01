import { useRouter } from 'next/router';
import Layout from '../../components/layout'
import { useEffect, useState } from 'react'
import axios from 'axios'
import MenuGrid from '../../components/menu/menuGrid'
import StoreInfoDiv from '../../components/store/storeInfoDiv'

export default function Post() {
  const router = useRouter();
  const [storeWithAll, setStoreWithAll] = useState()

  useEffect(async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/store/name/${router.query.store_name}?category=true&menu=true`)
      setStoreWithAll(res.data)
    } catch (err) {
      alert('가게 정보를 불러오는데 실패했습니다.')
    }
  }, [router.query.store_name])

  console.log(storeWithAll)

  return (
    <Layout>
    {
      storeWithAll ? (
        <>
          <StoreInfoDiv storeInfo={storeWithAll}/>
          <MenuGrid categoriesWithMenu={storeWithAll.category}/>
        </>
      ) : (
        <>
          <h1>해당 가게는 존재하지 않습니다.</h1>
        </>
      )
    }
    </Layout>
  );
}