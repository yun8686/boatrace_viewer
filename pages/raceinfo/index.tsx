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

  console.log('buydata', buydata)

  if(buydata?.sort){
    buydata?.sort((a, b) => a.raceinfo.time - b.raceinfo.time)
  }
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

          <span className={styles.dateBox_text}>{currentDate.toLocaleDateString()}</span>
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
            </li>
            {/* 下記はテスト用 */}
            <li className={styles.tasks_list}
              style={{
                backgroundColor:'lightgrey'
              }}
              >
              <label><span>津5R</span></label>
              <label><span>1-2-4</span></label>
              <label><span>3.2</span></label>
              <label><span>3400</span></label>
              <label><span>購入済み</span></label>
            </li>
            <li className={styles.tasks_list}>
              <label><span>住之江12R</span></label>
              <label><span>1-2-4</span></label>
              <label><span>2.8</span></label>
              <label><span>3400</span></label>
              <label><span>購入前</span></label>
            </li>
            {buydata?.sort ? (
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
                    <label>
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
    </div>
  )
}

export default BuyData
