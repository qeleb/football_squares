import Big from 'big.js';
import { Chart, Colors } from 'chart.js/auto';
import { Pie } from 'solid-chartjs';
import { onMount } from 'solid-js';

export const SingleWinningsPie = (props: { expected: () => Big }) => {
  onMount(() => Chart.register(Colors));

  return (
    <Pie
      data={{
        labels: ['total', 'expected'],
        datasets: [
          {
            data: [+Big(500).minus(props.expected()), +props.expected()],
            backgroundColor: ['#19679f', '#e54662'],
            borderColor: ['#e9fcd3', '#e9fcd3'],
            borderWidth: 1,
          },
        ],
      }}
      options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}
      width={40}
      height={40}
    />
  );
};
