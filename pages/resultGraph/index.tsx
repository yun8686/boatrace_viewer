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

  type JyoMaster = {
    code: string;
    name: string;
  };

  const jyoData: JyoMaster[] = [
    { code: "01", name: "桐生" },
    { code: "02", name: "戸田" },
    { code: "03", name: "江戸川" },
    { code: "04", name: "平和島" },
    { code: "05", name: "多摩川" },
    { code: "06", name: "浜名湖" },
    { code: "07", name: "蒲郡" },
    { code: "08", name: "常滑" },
    { code: "09", name: "津" },
    { code: "10", name: "三国" },
    { code: "11", name: "びわこ" },
    { code: "12", name: "住之江" },
    { code: "13", name: "尼崎" },
    { code: "14", name: "鳴門" },
    { code: "15", name: "丸亀" },
    { code: "16", name: "児島" },
    { code: "17", name: "宮島" },
    { code: "18", name: "徳山" },
    { code: "19", name: "下関" },
    { code: "20", name: "若松" },
    { code: "21", name: "芦屋" },
    { code: "22", name: "福岡" },
    { code: "23", name: "唐津" },
    { code: "24", name: "大村" },
  ];

  // ここに的中データをいれて欲しい（会場順にデータを入れて欲しい）
  // データの持ち方とか悪かったら修正して
  const resultHitData:Array<number[]> = [
    [6,7,0,7,3,9,8,9,5,6],//桐生の的中データ
    [4,6,7,7,5,6,9,7,5,3],//戸田の的中データ
    [4,3,2,7,0,8,1,4,3,2],//江戸川の的中データ
    [2,0,0,6,5,2,1,5,5,4],//平和島の的中データ
    [4,5,5,8,1,3,3,8,7,2],//多摩川の的中データ
    [2,0,0,7,1,8,2,2,0,1],//浜名湖の的中データ（以下省略）
    [6,5,1,2,4,3,1,4,1,8],
    [0,3,7,9,8,5,9,3,1,2],
    [5,0,1,8,7,0,1,2,3,1],
    [1,6,1,3,6,5,2,4,9,9],
    [1,4,6,1,0,7,6,9,1,8],
    [3,1,9,4,4,6,9,3,5,5],
    [3,7,3,9,0,1,2,0,3,1],
    [3,2,5,0,6,0,2,0,0,0],
    [4,9,6,6,4,5,8,1,1,9],
    [9,3,8,1,1,5,7,5,6,6],
    [7,3,4,6,7,7,0,1,1,4],
    [8,7,3,8,8,1,1,3,0,3],
    [1,6,0,7,3,2,7,9,6,7],
    [0,0,5,6,6,1,1,9,3,7],
  ];

  // カラーは24色設定（https://iro-color.com/colorchart/color-system-24.html）
  const colors:string[] = [
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
    'rgba(230,0,51,1)',
  ];

  interface GraphData {
    label: string,
    fill: boolean,
    lineTension: number,
    borderColor: string,
    borderCapStyle: string,
    borderDashOffset: number,
    borderJoinStyle: string,
    pointBorderColor: string,
    pointBackgroundColor: string,
    pointBorderWidth: number,
    pointRadius: number,
    pointHitRadius: number,
    data: number[],
  }
  let graph_datasets:GraphData[] = []; 
  
  for(let i=0; i < jyoData.length; i++){
    graph_datasets.push({
      label: jyoData[i].name,
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
      data: resultHitData[i]
    })
  }

  const data = dataValue && {
    labels: dataValue.dates,
    datasets: graph_datasets
  }
  const options = {
    maintainAspectRatio: false,
    responsive: true,
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
            <Link href={`/resultGraph?date=${dateToString(prevDate)}`}>
              <a>&lt;&lt; 前月</a>
            </Link>
          </button>
          <span className={styles.dateBox_text}>
            {from.toLocaleDateString()}~{to.toLocaleDateString()}
          </span>
          <button>
            <Link href={`/resultGraph?date=${dateToString(nextDate)}`}>
              <a>翌月 &gt;&gt;</a>
            </Link>
          </button>
        </div>

        <div className={styles.graph}>
          {data ? <Line data={data} 
            options={options}/> : <div>loading</div>}
        </div>
      </main>
      <Footer></Footer>
    </div>
  )
}

export default BuyData
