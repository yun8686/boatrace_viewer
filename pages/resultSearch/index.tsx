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
import { useCallback, useState } from 'react'
const resultSearchData = (param) => {
  const router = useRouter()
  const [searchText, setSearchText] = useState('')
  const [inputText, setInputText] = useState('')
  const { data } = useAspidaSWR(apiClient.resultsearch, {
    query: {
      text: searchText
    }
  })
  const runSearch = useCallback(
    (inputText) => {
      setSearchText(inputText)
    },
    [inputText]
  )
  console.log(data)
  return (
    <div className={styles.container}>
      <Head>
        <title>結果検索</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Menu></Menu>
      <main className={styles.main}>
        <h2 className={styles.title}>結果検索</h2>
        <div className={styles.setting}>
          <div className={styles.setting_cell}>
            <span className={styles.setting_title}>所持金</span>
            <textarea
              name="money"
              className={styles.setting_input}
              value={inputText}
              onChange={(text) => setInputText(text.target.value)}
            />
          </div>
          <button
            className={styles.setting_submit}
            onClick={() => runSearch(inputText)}
          >
            実行
          </button>
        </div>
        <h2 className={styles.title}>予想結果</h2>
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
                <span>結果</span>
              </label>
              <label>
                <span>オッズ</span>
              </label>
            </li>
            {data?.map((row) => (
              <li className={styles.tasks_list}>
                <label>
                  <span>{new Date(row?.racedate).toLocaleDateString()}</span>
                </label>
                <label>
                  <span>
                    {row.jyoname}
                    {row.raceno}R
                  </span>
                </label>
                <label>
                  <span>{row.kumiban}</span>
                </label>
                <label>
                  <span>{row.odds}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default resultSearchData
