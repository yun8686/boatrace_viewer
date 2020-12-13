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
  const year = router.query.year
    ? Number(router.query.year as string)
    : new Date().getFullYear()
  const { data: graphData } = useAspidaSWR(apiClient.allgraph, {
    query: {
      year
    }
  })
  const prevYear = year - 1
  const nextYear = year + 1

  type ResultData = {
    jyocode: string
    jyoname: string
    resultList: number[]
  }
  const dataValue = (graphData || []).reduce<ResultData[]>((prev, curr) => {
    if (prev.find((v) => v.jyocode === curr.jyocode)) {
      prev
        .find((v) => v.jyocode === curr.jyocode)
        ?.resultList.push(curr.winnum / curr.racenum)
    } else {
      prev.push({
        jyocode: curr.jyocode,
        jyoname: curr.jyoname,
        resultList: [curr.winnum / curr.racenum]
      })
    }
    return prev
  }, [])
  const monthList = (graphData || []).reduce<number[]>((prev, curr) => {
    if (prev.indexOf(curr.month) === -1) {
      prev.push(curr.month)
    }
    return prev
  }, [])

  // カラーは24色設定（https://iro-color.com/colorchart/color-system-24.html）
  const colors: string[] = [
    'rgba(230,0,18,1)',
    'rgba(235,97,0,1)',
    'rgba(243,152,0,1)',
    'rgba(252,200,0,1)',
    'rgba(255,251,0,1)',
    'rgba(207,219,10,1)',
    'rgba(143,195,31,1)',
    'rgba(34,172,56,1)',
    'rgba(0,153,68,1)',
    'rgba(0,155,107,1)',
    'rgba(0,158,150,1)',
    'rgba(0,160,193,1)',
    'rgba(0,160,233,1)',
    'rgba(0,134,209,1)',
    'rgba(0,104,183,1)',
    'rgba(0,71,157,1)',
    'rgba(29,32,136,1)',
    'rgba(96,25,134,1)',
    'rgba(146,7,131,1)',
    'rgba(190,0,129,1)',
    'rgba(228,0,127,1)',
    'rgba(229,0,106,1)',
    'rgba(229,0,79,1)',
    'rgba(230,0,51,1)'
  ]

  interface GraphData {
    label: string
    fill: boolean
    lineTension: number
    borderColor: string
    borderCapStyle: string
    borderDashOffset: number
    borderJoinStyle: string
    pointBorderColor: string
    pointBackgroundColor: string
    pointBorderWidth: number
    pointRadius: number
    pointHitRadius: number
    data: number[]
  }
  const graph_datasets: GraphData[] = []
  for (let i = 0; i < dataValue.length; i++) {
    graph_datasets.push({
      label: dataValue[i].jyoname,
      fill: false,
      lineTension: 0.1,
      borderColor: colors[i],
      borderCapStyle: 'butt',
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointRadius: 1,
      pointHitRadius: 10,
      data: dataValue[i].resultList
    })
  }

  const data = dataValue && {
    labels: monthList,
    datasets: graph_datasets
  }
  const options = {
    maintainAspectRatio: false,
    responsive: true
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>グラフ画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <Menu></Menu>
      <main className={styles.main}>
        <h2 className={styles.title}>1-2-3的中グラフ</h2>
        <div className={styles.dateBox}>
          <button>
            <Link href={`/resultGraph?year=${prevYear}`}>
              <a>&lt;&lt; 前月</a>
            </Link>
          </button>
          <span className={styles.dateBox_text}>{year}年</span>
          <button>
            <Link href={`/resultGraph?year=${nextYear}`}>
              <a>翌月 &gt;&gt;</a>
            </Link>
          </button>
        </div>

        <div className={styles.graph}>
          {data ? <Line data={data} options={options} /> : <div>loading</div>}
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default BuyData
