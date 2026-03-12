<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="dist in distributions"
      :key="dist.field"
    >
      <h3 class="text-xs font-semibold text-secondary uppercase mb-2">
        {{ dist.fieldLabel }}
      </h3>
      <div class="max-h-[400px] relative">
        <component
          :is="currentChartComponent"
          :data="buildChartData(dist)"
          :options="chartOptions"
          :aria-label="`${chartType} chart for ${dist.fieldLabel}`"
          role="img"
        />
      </div>
    </div>
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
import {
  computeAllFieldDistributions,
  CHART_COLORS,
  type FieldDistribution,
} from "@/utilities/chartDataHelpers";

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
  return props.chartType === "bar" ? Bar : Pie;
});

const distributions = computed(() =>
  computeAllFieldDistributions(props.entries),
);

function buildChartData(dist: FieldDistribution) {
  return {
    labels: dist.items.map((item) => item.label),
    datasets: [
      {
        label: dist.fieldLabel,
        data: dist.items.map((item) => item.count),
        backgroundColor: CHART_COLORS.slice(0, dist.items.length),
      },
    ],
  };
}

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1,
        precision: 0,
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxWidth: 0, // removes colored square
        boxHeight: 0,
      },
    },
  },
}));
</script>
