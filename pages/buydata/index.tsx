import Head from 'next/head'
import Link from 'next/link'
import useAspidaSWR from '@aspida/swr'
import Header from '../../components/Header'
import Menu from '../../components/Menu'
import Footer from '../../components/Footer'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import { dateToString, stringToDate } from '~/utils/dateUtils'
import { useRouter } from 'next/dist/client/router'
const BuyData = (param) => {
  const router = useRouter()
  const dateStr = router.query.date
    ? (router.query.date as string)
    : dateToString(new Date())
  const { data: buydata } = useAspidaSWR(apiClient.buydata, {
    query: {
      date: dateStr
    }
  })
  const currentDate = stringToDate(dateStr)
  const prevDate = new Date(
    stringToDate(dateStr).setDate(currentDate.getDate() - 1)
  )
  const nextDate = new Date(
    stringToDate(dateStr).setDate(currentDate.getDate() + 1)
  )
  buydata?.sort((a, b) => a.raceinfo.time - b.raceinfo.time)
  return (
    <div className={styles.container}>
      <Head>
        <title>本日の購入</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Menu></Menu>
      <main className={styles.main}>
        <h2 className={styles.title}>購入リスト</h2>
        <div className={styles.dateBox}>
          <button>
            <Link href={`/buydata?date=${dateToString(prevDate)}`}>
              <a>&lt;&lt; 前日</a>
            </Link>
          </button>
          <span className={styles.dateBox_text}>{currentDate.toLocaleDateString()}</span>
          <button>
            <Link href={`/buydata?date=${dateToString(nextDate)}`}>
              <a>翌日 &gt;&gt;</a>
            </Link>
          </button>
        </div>

        <div>
          <ul className={styles.tasks}>
            <li className={styles.tasks_list}>
              <label>
                <span>レース</span>
              </label>
              <label>
                <span>買い目</span>
              </label>
              <label>
                <span>購入額</span>
              </label>
              <label>
                <span>結果</span>
              </label>
              <label>
                <span>払戻額</span>
              </label>
            </li>
            {buydata ? (
              buydata.map((data) => {
                const santanodds = data.raceinfo.raceresult?.santanodds || 0
                const price = data.price || 0
                const isWin =
                  data.raceinfo.raceresult?.santankumiban === data.kumiban

                const getPrice = Math.round(isWin ? price * santanodds : 0)

                return (
                  <li className={styles.tasks_list}>
                    <label>
                      <span>{`${data.jyomst?.name}${parseInt(
                        data.raceNo
                      )}R`}</span>
                    </label>
                    <label>
                      <span>{`${data.kumiban}`}</span>
                    </label>
                    <label>
                      <span>{`${price}`}</span>
                    </label>
                    <label>
                      <span>{`${data.raceinfo.raceresult?.santankumiban}`}</span>
                    </label>
                    <label
                      style={{
                        backgroundColor: isWin ? 'lightgreen' : 'transparent'
                      }}
                    >
                      <span>{`${getPrice}`}</span>
                    </label>
                  </li>
                )
              })
            ) : (
              <div>...loading</div>
            )}
          </ul>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default BuyData
