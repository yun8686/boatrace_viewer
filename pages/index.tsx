import Head from 'next/head'
import Link from 'next/link'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import Header from '../components/Header'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import { apiClient } from '~/utils/apiClient'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>競艇投資</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Menu></Menu>
      <main className={styles.main}>
        <p>本サイトでは購入したリストを確認することができます。</p>

        <div className={styles.button_wrapper}>
          <button>
            <Link href="/buydata">
              <p>購入リスト画面へ遷移 ＞</p>
            </Link>
          </button>
          <button>
            <Link href="/raceinfo">
              <p>監視状況画面へ遷移 ＞</p>
            </Link>
          </button>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default Home
