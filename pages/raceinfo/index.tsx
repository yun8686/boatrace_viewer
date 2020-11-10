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
  const { data: raceinfo } = useAspidaSWR(apiClient.raceinfo, {
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

  let currentTime = 10000
  if (dateToString(new Date()) === dateStr) {
    currentTime = new Date().getHours() * 100 + new Date().getMinutes()
  }

  raceinfo?.sort((a, b) => a.time - b.time)
  return (
    <div className={styles.container}>
      <Head>
        <title>監視状況</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Menu></Menu>
      <main className={styles.main}>
        <h2 className={styles.title}>監視状況</h2>
        <div className={styles.dateBox}>
          <button>
            <Link href={`/raceinfo?date=${dateToString(prevDate)}`}>
              <a>&lt;&lt; 前日</a>
            </Link>
          </button>
          <span className={styles.dateBox_text}>
            {currentDate.toLocaleDateString()}
          </span>
          <button>
            <Link href={`/raceinfo?date=${dateToString(nextDate)}`}>
              <a>翌日 &gt;&gt;</a>
            </Link>
          </button>
        </div>
        <div className={styles.dateBox}>
          <span className={styles.dateBox_text}>
            {currentDate.toLocaleDateString()}
          </span>
          <p>レース時間：9:00〜21:30</p>
          <p>購入回数：10</p>
        </div>

        <div>
          <ul className={styles.tasks}>
            <li className={styles.tasks_list}>
              <label>
                <span>レース</span>
              </label>
              <label>
                <span>開始時刻</span>
              </label>
              <label>
                <span>買い目</span>
              </label>
              <label>
                <span>オッズ</span>
              </label>
              <label>
                <span>購入額</span>
              </label>
              <label>
                <span>状態</span>
              </label>
              <label>
                <span>結果</span>
              </label>
            </li>
            {/* 下記はテスト用 */}
            {raceinfo?.map((race) => (
              <li
                className={styles.tasks_list}
                style={{
                  backgroundColor: race.time < currentTime ? 'lightgrey' : ''
                }}
              >
                <label>
                  <span>
                    {race.jyoname}
                    {race.raceNo}R
                  </span>
                </label>
                <label>
                  <span>{race.time}</span>
                </label>
                <label>
                  <span>{race.buykumiban}</span>
                </label>
                <label>
                  <span>{race.fstodds}</span>
                </label>
                <label>
                  <span>{race.buyprice}</span>
                </label>
                <label>
                  <span>
                    {race.buystatus === 'complete'
                      ? '購入済'
                      : race.buystatus === 'closed'
                      ? '購入できなかった'
                      : ''}
                  </span>
                </label>
                <label>
                  <span>{race.reskumiban}</span>
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
