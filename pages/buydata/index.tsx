import Head from 'next/head'
import Link from 'next/link'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import { dateToString } from '~/utils/dateUtils'
import { useRouter } from 'next/dist/client/router'
const BuyData = (param) => {
  const router = useRouter()
  console.log('param', param, router.query)
  const { data: buydata, error } = useAspidaSWR(apiClient.buydata, {
    query: {
      date: router.query.date
        ? (router.query.date as string)
        : dateToString(new Date())
    }
  })
  const { data: jyomst } = useAspidaSWR(apiClient.jyomst)

  return (
    <div className={styles.container}>
      <Head>
        <title>本日の購入</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>競艇投資メニュー</h1>
        <div>
          <ul className={styles.tasks}>
            {buydata?.map((data) => (
              <li>
                <label>
                  <a>{data.racedate}</a>
                  <a>{jyomst?.find((v) => v.code === data.jyoCode)?.name}</a>
                  <a>{data.kumiban}</a>
                  <a>{data.price}</a>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  )
}
export default BuyData
