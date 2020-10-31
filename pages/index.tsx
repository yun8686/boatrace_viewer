import Head from 'next/head'
import Link from 'next/link'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'

const Home = () => {
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
            <li>
              <label>
                <Link href="/raceinfo">
                  <a>監視状況</a>
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
