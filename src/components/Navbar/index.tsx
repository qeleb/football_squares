import { createSignal } from 'solid-js';
import styles from '@/components/Navbar/Navbar.module.scss';

export const Navbar = () => {
  const [hideMenu, setHideMenu] = createSignal(true);

  return (
    <div class={`${styles.Navbar} ${hideMenu() ? styles.hidden : ''}`}>
      <div class={styles.links}>
        <a href="#top" class={styles.brand} aria-label="Return to Top">
          football squares
        </a>
        <a href="#scores">scores</a>
        <a href="#expect">expected $</a>
        <a href="#rank">rank</a>
      </div>
      <button onClick={() => setHideMenu(p => !p)}>^</button>
    </div>
  );
};
