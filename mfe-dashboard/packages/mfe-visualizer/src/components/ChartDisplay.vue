<template>
  <div>
    <component
      :is="currentChartComponent"
      :data="chartData"
      :options="chartOptions"
      :aria-label="`${chartType} chart of entries`"
      role="img"
    />
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import type { FormEntry } from "@shared/src/types";
import { computedCountryDistribution } from "@/utilities/chartDataHelpers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
);

interface Props {
  entries: FormEntry[];
  chartType: "bar" | "pie";
}

const props = defineProps<Props>();

const currentChartComponent = computed(() => {
  props.chartType === "bar" ? Bar : Pie;
});

const chartData = computed(() => {
  const distribution = computedCountryDistribution(props.entries);

  return {
    labels: distribution.map((item) => item.countryLabel),
    datasets: [
      {
        label: "Entries by Country",
        data: distribution.map((item) => item.count),
        backgroundColor: [
          "red",
          "purple",
          "yellow",
          "blue",
          "teal",
          "grey",
          "orange",
          "green",
          "magenta",
        ],
      },
    ],
  };
});

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: { position: "bottom" as const },
  },
}));
</script>
