import Link from 'next/link'
import styles from '~/styles/components/menu.module.css'

const Menu = () => {
  return <menu className={styles.menu}>
        <ul className={styles.menu_list}>
          <li>
            <Link href="/buydata">
              <p>購入リスト</p>
            </Link>
          </li>
          <li>
            <Link href="/raceinfo">
              <p>監視状況</p>
            </Link>
          </li>
        </ul>
      </menu>
}
export default Menu
