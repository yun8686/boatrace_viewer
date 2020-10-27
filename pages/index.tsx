import Head from 'next/head'
import Link from 'next/link'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'

const Home = () => {
  const { data: jyoList, error } = useAspidaSWR(apiClient.jyomst)
  const { data: buyData, error: buyDataError } = useAspidaSWR(apiClient.buydata)

  if (error) return <div>failed to load</div>
  if (!jyoList) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>競艇投資メニュー</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>競艇投資メニュー</h1>
        <div>
          <ul className={styles.tasks}>
            <li>
              <label>
                <Link href="/buydata">
                  <a>購入リスト</a>
                </Link>
              </label>
            </li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Home