import Big from 'big.js';
import { For, createMemo, createSignal } from 'solid-js';
import { WinningsPie } from '@/components/Charts/WinningsPie';
import { Footer } from '@/components/Footer';
import {
  getChanceCorrect,
  getChanceReverse,
  getExactValue,
  getExpectedValue,
  players,
  q1,
  q2,
  q3,
  q4,
} from '@/data/chances';
import styles from '@/pages/Home/Home.module.scss';

export const Home = () => {
  const [q1Chiefs, setQ1Chiefs] = createSignal<number | undefined>(undefined);
  const [q2Chiefs, setQ2Chiefs] = createSignal<number | undefined>(undefined);
  const [q3Chiefs, setQ3Chiefs] = createSignal<number | undefined>(undefined);
  const [q4Chiefs, setQ4Chiefs] = createSignal<number | undefined>(undefined);

  const [q1Nine, setQ1Nine] = createSignal<number | undefined>(undefined);
  const [q2Nine, setQ2Nine] = createSignal<number | undefined>(undefined);
  const [q3Nine, setQ3Nine] = createSignal<number | undefined>(undefined);
  const [q4Nine, setQ4Nine] = createSignal<number | undefined>(undefined);

  const [filter, setFilter] = createSignal(new URLSearchParams(location.search).get('name') || '');

  const q1Edited = createMemo(() => q1Chiefs() != null && q1Nine() != null);
  const q2Edited = createMemo(() => q2Chiefs() != null && q2Nine() != null);
  const q3Edited = createMemo(() => q3Chiefs() != null && q3Nine() != null);
  const q4Edited = createMemo(() => q4Chiefs() != null && q4Nine() != null);

  return (
    <div class={styles.Home}>
      <div class={styles.scores}>
        <div class={styles.scoreSheet}>
          <h1 id="top">Football Squares</h1>
          <h3>Quarterly scores</h3>
          <div class={styles.score}>
            <label>Q1</label>
            <input prop:maxLength={1} type="number" placeholder="Chiefs" onChange={e => setQ1Chiefs(+e.target.value)} />
            <input type="number" placeholder="49ers" onChange={e => setQ1Nine(+e.target.value)} />
          </div>
          <div class={styles.score}>
            <label>Q2</label>
            <input type="number" placeholder="Chiefs" onChange={e => setQ2Chiefs(+e.target.value)} />
            <input type="number" placeholder="49ers" onChange={e => setQ2Nine(+e.target.value)} />
          </div>
          <div class={styles.score}>
            <label>Q3</label>
            <input type="number" placeholder="Chiefs" onChange={e => setQ3Chiefs(+e.target.value)} />
            <input type="number" placeholder="49ers" onChange={e => setQ3Nine(+e.target.value)} />
          </div>
          <div class={styles.score}>
            <label>Q4</label>
            <input type="number" placeholder="Chiefs" onChange={e => setQ4Chiefs(+e.target.value)} />
            <input type="number" placeholder="49ers" onChange={e => setQ4Nine(+e.target.value)} />
          </div>
        </div>
      </div>
      <div class={styles.expected}>
        <h3 id="expect">Expected value</h3>
        <input
          class={styles.filter}
          type="text"
          placeholder="filter"
          value={filter()}
          onInput={e => setFilter(e.target.value.toLowerCase())}
        />
        <div class={styles.values}>
          <For each={Object.entries(players).filter(x => !filter() || x[0].toLowerCase().includes(filter()))}>
            {([name, scores]) => {
              const chanceCorrectQ1 = createMemo(() =>
                q1Edited()
                  ? Big(+scores.some(([chiefs, nine]) => chiefs === q1Chiefs() && nine === q1Nine()))
                  : getChanceCorrect(q1, scores as [number, number][])
              );
              const chanceCorrectQ2 = createMemo(() =>
                q2Edited()
                  ? Big(+scores.some(([chiefs, nine]) => chiefs === q2Chiefs() && nine === q2Nine()))
                  : getChanceCorrect(q2, scores as [number, number][])
              );
              const chanceCorrectQ3 = createMemo(() =>
                q3Edited()
                  ? Big(+scores.some(([chiefs, nine]) => chiefs === q3Chiefs() && nine === q3Nine()))
                  : getChanceCorrect(q3, scores as [number, number][])
              );
              const chanceCorrectQ4 = createMemo(() =>
                q4Edited()
                  ? Big(+scores.some(([chiefs, nine]) => chiefs === q4Chiefs() && nine === q4Nine()))
                  : getChanceCorrect(q4, scores as [number, number][])
              );
              const chanceCorrectRight = createMemo(() =>
                chanceCorrectQ1().add(chanceCorrectQ2()).add(chanceCorrectQ3()).add(chanceCorrectQ4()).gte(1)
              );
              const chanceReverseQ1 = createMemo(() =>
                q1Edited()
                  ? Big(+scores.some(([nine, chiefs]) => chiefs === q1Chiefs() && nine === q1Nine()))
                  : getChanceReverse(q1, scores as [number, number][])
              );
              const chanceReverseQ2 = createMemo(() =>
                q2Edited()
                  ? Big(+scores.some(([nine, chiefs]) => chiefs === q2Chiefs() && nine === q2Nine()))
                  : getChanceReverse(q2, scores as [number, number][])
              );
              const chanceReverseQ3 = createMemo(() =>
                q3Edited()
                  ? Big(+scores.some(([nine, chiefs]) => chiefs === q3Chiefs() && nine === q3Nine()))
                  : getChanceReverse(q3, scores as [number, number][])
              );
              const chanceReverseQ4 = createMemo(() =>
                q4Edited()
                  ? Big(+scores.some(([nine, chiefs]) => chiefs === q4Chiefs() && nine === q4Nine()))
                  : getChanceReverse(q4, scores as [number, number][])
              );
              const chanceReverseRight = createMemo(() =>
                chanceReverseQ1().add(chanceReverseQ2()).add(chanceReverseQ3()).add(chanceReverseQ4()).gte(1)
              );
              const expectedQ1 = createMemo(() =>
                q1Edited()
                  ? getExactValue([q1Chiefs()!, q1Nine()!], scores as [number, number][])
                  : getExpectedValue(q1, scores as [number, number][])
              );
              const expectedQ2 = createMemo(() =>
                q2Edited()
                  ? getExactValue([q2Chiefs()!, q2Nine()!], scores as [number, number][])
                  : getExpectedValue(q2, scores as [number, number][])
              );
              const expectedQ3 = createMemo(() =>
                q3Edited()
                  ? getExactValue([q3Chiefs()!, q3Nine()!], scores as [number, number][])
                  : getExpectedValue(q3, scores as [number, number][])
              );
              const expectedQ4 = createMemo(() =>
                q4Edited()
                  ? getExactValue([q4Chiefs()!, q4Nine()!], scores as [number, number][])
                  : getExpectedValue(q4, scores as [number, number][])
              );
              return (
                <div class={styles.person}>
                  <span class={styles.name}>
                    <svg viewBox="0 0 20 20">
                      <path d="M10 13c-6 0-9 3-9 5v1h18v-1c0-2-3-5-9-5z" />
                      <circle cx="10" cy="6" r="5" />
                    </svg>
                    <div>{name}</div>
                  </span>
                  <span class={styles.chance}>
                    expected value:{' '}
                    <i>${expectedQ1().add(expectedQ2()).add(expectedQ3()).add(expectedQ4()).toFixed(2)}</i>
                  </span>
                  <span class={styles.chart}>
                    <WinningsPie expected={() => expectedQ1().add(expectedQ2()).add(expectedQ3()).add(expectedQ4())} />
                  </span>
                  <span class={styles.chance}>
                    chance correct:{' '}
                    <i>
                      {chanceCorrectRight()
                        ? 'win'
                        : `${Big(1)
                            .minus(Big(1).minus(chanceCorrectQ1()))
                            .mul(Big(1).minus(chanceCorrectQ2()))
                            .mul(Big(1).minus(chanceCorrectQ3()))
                            .mul(Big(1).minus(chanceCorrectQ4()))
                            .toPrecision(3)}%`}
                    </i>
                  </span>
                  <span class={styles.chance}>
                    chance reverse:{' '}
                    <i>
                      {chanceReverseRight()
                        ? 'win'
                        : `${Big(1)
                            .minus(Big(1).minus(chanceReverseQ1()))
                            .mul(Big(1).minus(chanceReverseQ2()))
                            .mul(Big(1).minus(chanceReverseQ3()))
                            .mul(Big(1).minus(chanceReverseQ4()))
                            .toPrecision(3)}%`}
                    </i>
                  </span>
                </div>
              );
            }}
          </For>
        </div>
      </div>
      <Footer />
    </div>
  );
};
