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
const ExpectedData = (param) => {
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
        <title>予想画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Menu></Menu>
      <main className={styles.main}>
        <h2 className={styles.title}>予想設定</h2>
        <form className={styles.setting}>
          <div className={styles.setting_cell}>
            <span className={styles.setting_title}>所持金</span>
            <input
              name="money"
              type="number"
              // value={price}
              // onChange={(e) => setPrice(parseInt(e.target.value))}
              className={styles.setting_input}
            />
            円
          </div>
          <div className={styles.setting_cell}>
            <span className={styles.setting_title}>
              損切金額
            </span>
            <input name="loss_cut" type="number" className={styles.setting_input} />円
          </div>
          <div className={styles.setting_cell}>
            <span className={styles.setting_title}>期間</span>
            <div className={styles.setting_input}>
              <input type="date" name="start_date" />〜
              <input type="date" name="end_date" />
            </div>
          </div>
          <div className={styles.setting_cell}>
            <span className={styles.setting_title}>買い方</span>
            <select
              name="odds_buy"
              // value={plan}
              // onChange={(e) => setPlan(e.target.value)}
              className={styles.setting_input}
            >
              <option value="lte4x">4倍以下買い</option>
              <option value="lte6x">6倍以下買い</option>
              <option value="3">未定</option>
              <option value="4">未定</option>
            </select>
          </div>
          <div className={styles.setting_cell}>
            <span className={styles.setting_title}>掛け方</span>
            <select
              name="method_buy"
              // value={rule}
              // onChange={(e) => setRule(e.target.value)}
              className={styles.setting_input}
            >
              <option value="cocomo">ココモ法</option>
              <option value="martingale">マーチンゲール法</option>
              <option value="3">ローリスク・ローリターン</option>
              <option value="4">未定</option>
            </select>
          </div>
          <button className="setting_submit" type="submit">
            実行
          </button>
        </form>
        <div className={styles.dateBox}>
          <span className={styles.dateBox_text}>{currentDate.toLocaleDateString()}</span>
        </div>

        <div>
          <ul className={styles.tasks}>
            <li className={styles.tasks_list}>
              <label>
                <span>日付</span>
              </label>
              <label>
                <span>レース</span>
              </label>
              <label>
                <span>購入額</span>
              </label>
              <label>
                <span>結果</span>
              </label>
              <label>
                <span>損益</span>
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

export default ExpectedData
