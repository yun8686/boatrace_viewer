import Head from 'next/head'
import useAspidaSWR from '@aspida/swr'
import styles from '~/styles/Home.module.css'
import { apiClient } from '~/utils/apiClient'
import UserBanner from '~/components/UserBanner'

const Home = () => {
  const { data: jyoList, error } = useAspidaSWR(apiClient.jyomst)

  if (error) return <div>failed to load</div>
  if (!jyoList) return <div>loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>frourio-todo-app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <UserBanner />

        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>frourio-todo-app</p>

        <div>
          <ul className={styles.tasks}>
            {jyoList.map((jyoData) => (
              <li key={jyoData.code}>
                <label>
                  <span>{jyoData.name}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

export default Home
