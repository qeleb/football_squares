import type Big from 'big.js';
import { Chart, Colors } from 'chart.js/auto';
import { Bar } from 'solid-chartjs';
import { createMemo, onMount } from 'solid-js';

export const BarRank = (props: { totals: () => { [x: string]: Big } }) => {
  onMount(() => Chart.register(Colors));

  const sorted = createMemo(() => Object.entries(props.totals()).sort((a, b) => b[1].minus(a[1]).toNumber()));

  return (
    <Bar
      data={{
        labels: sorted().map(x => x[0]),
        datasets: [
          {
            data: sorted()
              .map(x => x[1])
              .map(v => +v.toFixed(2)),
            backgroundColor: ['#c9dcb3'],
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: { y: { ticks: { callback: (x: string, i: any, t: any) => `$${x}` } } },
      }}
      width={40}
      height={40}
    />
  );
};
