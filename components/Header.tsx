import styles from '~/styles/components/header.module.css'

const Header = () => {
  return <header className={styles.header}>
        <img className={styles.icon} src="/icon.png"/><h1 className={styles.title}>競艇投資</h1>
      </header>
}

export default Header
