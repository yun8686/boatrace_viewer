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

import React from 'react'
import { Line } from 'react-chartjs-2'

const BuyData = (param) => {
  const router = useRouter()
  const dateStr = router.query.date
    ? (router.query.date as string)
    : dateToString(new Date())
  const currentDate = stringToDate(dateStr)
  const from = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
  const to = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
  const { data: graphData } = useAspidaSWR(apiClient.graph, {
    query: {
      from: dateToString(from),
      to: dateToString(to)
    }
  })
  const prevDate = new Date(
    stringToDate(dateStr).setMonth(currentDate.getMonth() - 1)
  )
  const nextDate = new Date(
    stringToDate(dateStr).setMonth(currentDate.getMonth() + 1)
  )

  const dataValue = graphData?.monthDataList.reduce<{
    dates: string[]
    moneys: number[]
  }>(
    (prev, curr, i) => {
      return {
        dates: [
          ...prev.dates,
          `${new Date(curr.racedate).getMonth() + 1} / ${new Date(
            curr.racedate
          ).getDate()}`
        ],
        moneys: [
          ...prev.moneys,
          curr.payoutsum - curr.paysum + (prev.moneys[i - 1] || 0)
        ]
      }
    },
    {
      dates: [],
      moneys: []
    }
  )
  const data = dataValue && {
    labels: dataValue.dates,
    datasets: [
      {
        label: '所持金',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 100,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: dataValue.moneys,
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      }
    ]
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>本日の購入</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Menu></Menu>
      <main className={styles.main}>
        <h2 className={styles.title}>所持金グラフ</h2>
        <div className={styles.dateBox}>
          <button>
            <Link href={`/graph?date=${dateToString(prevDate)}`}>
              <a>&lt;&lt; 前月</a>
            </Link>
          </button>
          <span className={styles.dateBox_text}>
            {from.toLocaleDateString()}~{to.toLocaleDateString()}
          </span>
          <button>
            <Link href={`/graph?date=${dateToString(nextDate)}`}>
              <a>翌月 &gt;&gt;</a>
            </Link>
          </button>
        </div>

        <div className={styles.graph}>
          {data ? <Line data={data} /> : <div>loading</div>}
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default BuyData
