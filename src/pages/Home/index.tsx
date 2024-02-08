/* eslint-disable no-unexpected-multiline */

import Big from 'big.js';
import { For, createMemo, createSignal } from 'solid-js';
import { BarRank } from '@/components/Charts/BarRank';
import { SingleWinningsPie } from '@/components/Charts/SingleWinningsPie';
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

  const [quarter, setQuarter] = createSignal(0); // 0 = Total, 1 = Q1, 2 = Q2, 3 = Q3, 4 = Q4
  const [filter, setFilter] = createSignal(new URLSearchParams(location.search).get('name') || '');

  const q1Edited = createMemo(() => q1Chiefs() != null && q1Nine() != null);
  const q2Edited = createMemo(() => q2Chiefs() != null && q2Nine() != null);
  const q3Edited = createMemo(() => q3Chiefs() != null && q3Nine() != null);
  const q4Edited = createMemo(() => q4Chiefs() != null && q4Nine() != null);

  const chanceCorrectQ1 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q1Edited()
          ? Big(+scores.some(([chiefs, nine]) => chiefs === q1Chiefs() && nine === q1Nine()))
          : getChanceCorrect(q1, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceCorrectQ2 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q2Edited()
          ? Big(+scores.some(([chiefs, nine]) => chiefs === q2Chiefs() && nine === q2Nine()))
          : getChanceCorrect(q2, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceCorrectQ3 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q3Edited()
          ? Big(+scores.some(([chiefs, nine]) => chiefs === q3Chiefs() && nine === q3Nine()))
          : getChanceCorrect(q3, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceCorrectQ4 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q4Edited()
          ? Big(+scores.some(([chiefs, nine]) => chiefs === q4Chiefs() && nine === q4Nine()))
          : getChanceCorrect(q4, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceCorrectTotal = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        Big(1).minus(
          Big(1)
            .minus(chanceCorrectQ1()[name])
            .mul(Big(1).minus(chanceCorrectQ2()[name]))
            .mul(Big(1).minus(chanceCorrectQ3()[name]))
            .mul(Big(1).minus(chanceCorrectQ4()[name]))
        ),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceCorrectRight = createMemo<{ [x: string]: boolean }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, boolean] => [
        name,
        chanceCorrectQ1()
          [name].add(chanceCorrectQ2()[name])
          .add(chanceCorrectQ3()[name])
          .add(chanceCorrectQ4()[name])
          .gte(1),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceReverseQ1 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q1Edited()
          ? Big(+scores.some(([chiefs, nine]) => chiefs === q1Nine() && nine === q1Chiefs()))
          : getChanceReverse(q1, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceReverseQ2 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q2Edited()
          ? Big(+scores.some(([chiefs, nine]) => chiefs === q2Nine() && nine === q2Chiefs()))
          : getChanceReverse(q2, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceReverseQ3 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q3Edited()
          ? Big(+scores.some(([chiefs, nine]) => chiefs === q3Nine() && nine === q3Chiefs()))
          : getChanceReverse(q3, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceReverseQ4 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q4Edited()
          ? Big(+scores.some(([chiefs, nine]) => chiefs === q4Nine() && nine === q4Chiefs()))
          : getChanceReverse(q4, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceReverseTotal = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        Big(1).minus(
          Big(1)
            .minus(chanceReverseQ1()[name])
            .mul(Big(1).minus(chanceReverseQ2()[name]))
            .mul(Big(1).minus(chanceReverseQ3()[name]))
            .mul(Big(1).minus(chanceReverseQ4()[name]))
        ),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const chanceReverseRight = createMemo<{ [x: string]: boolean }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, boolean] => [
        name,
        chanceReverseQ1()
          [name].add(chanceReverseQ2()[name])
          .add(chanceReverseQ3()[name])
          .add(chanceReverseQ4()[name])
          .gte(1),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const expectedQ1 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q1Edited()
          ? getExactValue([q1Chiefs()!, q1Nine()!], scores as [number, number][])
          : getExpectedValue(q1, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const expectedQ2 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q2Edited()
          ? getExactValue([q2Chiefs()!, q2Nine()!], scores as [number, number][])
          : getExpectedValue(q2, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const expectedQ3 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q3Edited()
          ? getExactValue([q3Chiefs()!, q3Nine()!], scores as [number, number][])
          : getExpectedValue(q3, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const expectedQ4 = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        q4Edited()
          ? getExactValue([q4Chiefs()!, q4Nine()!], scores as [number, number][])
          : getExpectedValue(q4, scores as [number, number][]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const expectedTotal = createMemo<{ [x: string]: Big }>(() =>
    Object.entries(players)
      .map(([name, scores]): [string, Big] => [
        name,
        expectedQ1()[name].add(expectedQ2()[name]).add(expectedQ3()[name]).add(expectedQ4()[name]),
      ])
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
  );

  const selectedQuarter = createMemo(() => {
    switch (quarter()) {
      case 1:
        return expectedQ1();
      case 2:
        return expectedQ2();
      case 3:
        return expectedQ3();
      case 4:
        return expectedQ4();
      default:
        return expectedTotal();
    }
  });

  const handleScoreInput = (e: SolidChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(-1);
    return value === '' ? undefined : +value;
  };

  return (
    <div class={styles.Home}>
      <div class={styles.scores}>
        <div class={styles.scoreSheet}>
          <h1 id="top">Football Squares</h1>
          <h3 id="scores">Quarterly scores</h3>
          <div class={styles.score}>
            <label>Q1</label>
            <input type="number" placeholder="Chiefs" onChange={e => setQ1Chiefs(handleScoreInput(e))} />
            <input type="number" placeholder="49ers" onChange={e => setQ1Nine(handleScoreInput(e))} />
          </div>
          <div class={styles.score}>
            <label>Q2</label>
            <input type="number" placeholder="Chiefs" onChange={e => setQ2Chiefs(handleScoreInput(e))} />
            <input type="number" placeholder="49ers" onChange={e => setQ2Nine(handleScoreInput(e))} />
          </div>
          <div class={styles.score}>
            <label>Q3</label>
            <input type="number" placeholder="Chiefs" onChange={e => setQ3Chiefs(handleScoreInput(e))} />
            <input type="number" placeholder="49ers" onChange={e => setQ3Nine(handleScoreInput(e))} />
          </div>
          <div class={styles.score}>
            <label>Q4</label>
            <input type="number" placeholder="Chiefs" onChange={e => setQ4Chiefs(handleScoreInput(e))} />
            <input type="number" placeholder="49ers" onChange={e => setQ4Nine(handleScoreInput(e))} />
          </div>
        </div>
      </div>
      <div class={styles.visual}>
        <h3 id="expect">Expected $</h3>
        <div class={styles.graphExpected}>
          {' '}
          <BarRank totals={() => selectedQuarter()} />
          <div class={styles.graphButtons}>
            <button onClick={() => setQuarter(1)}>Q1</button>
            <button onClick={() => setQuarter(2)}>Q2</button>
            <button onClick={() => setQuarter(3)}>Q3</button>
            <button onClick={() => setQuarter(4)}>Q4</button>
            <button onClick={() => setQuarter(0)}>Overall</button>
          </div>
        </div>
      </div>
      <div class={styles.expected}>
        <h3 id="rank">Rankings</h3>
        <input
          class={styles.filter}
          type="text"
          placeholder="filter"
          value={filter()}
          onInput={e => setFilter(e.target.value.toLowerCase())}
        />
        <div class={styles.values}>
          <For
            each={Object.entries(players)
              .sort((x1, x2) => expectedTotal()[x2[0]].toNumber() - expectedTotal()[x1[0]].toNumber())
              .filter(x => !filter() || x[0].toLowerCase().includes(filter()))}
          >
            {([name, scores]) => (
              <div class={styles.person}>
                <span class={styles.name}>
                  <svg viewBox="0 0 20 20">
                    <path d="M10 13c-6 0-9 3-9 5v1h18v-1c0-2-3-5-9-5z" />
                    <circle cx="10" cy="6" r="5" />
                  </svg>
                  <div>{name}</div>
                </span>
                <span class={styles.chance}>
                  expected value: <i>${expectedTotal()[name].toFixed(2)}</i>
                </span>
                <span class={styles.chart}>
                  <SingleWinningsPie
                    expected={() =>
                      expectedQ1()[name].add(expectedQ2()[name]).add(expectedQ3()[name]).add(expectedQ4()[name])
                    }
                  />
                </span>
                <span class={styles.chance}>
                  chance correct:{' '}
                  <i>{chanceCorrectRight()[name] ? 'win' : `${chanceCorrectTotal()[name].mul(100).toPrecision(4)}%`}</i>
                </span>
                <span class={styles.chance}>
                  chance reverse:{' '}
                  <i>{chanceReverseRight()[name] ? 'win' : `${chanceReverseTotal()[name].mul(100).toPrecision(4)}%`}</i>
                </span>
              </div>
            )}
          </For>
        </div>
      </div>
      <Footer />
    </div>
  );
};
