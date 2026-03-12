<template>
  <div class="flex flex-col gap-4">
    <div
      v-for="chart in chartData"
      :key="chart.field"
    >
      <h3 class="text-xs font-semibold text-secondary uppercase mb-2">
        {{ chart.fieldLabel }}
      </h3>

      <div class="relative">
        <component
          :is="chartComponent"
          :data="chart.data"
          :options="computedChartOptions"
          :aria-label="`${chartType} chart for ${chart.fieldLabel}`"
          role="img"
        />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, shallowRef, watch } from "vue";
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

const chartComponent = computed(() => (props.chartType === "bar" ? Bar : Pie));

const distributions = computed(() =>
  computeAllFieldDistributions(props.entries),
);

const chartData = shallowRef<any[]>([]);

watch(
  distributions,
  (newDist) => {
    chartData.value = newDist.map((dist) => ({
      field: dist.field,
      fieldLabel: dist.fieldLabel,
      data: {
        labels: dist.items.map((item) => item.label),
        datasets: [
          {
            label: dist.fieldLabel,
            data: dist.items.map((item) => item.count),
            backgroundColor: CHART_COLORS.slice(0, dist.items.length),
          },
        ],
      },
    }));
  },
  { immediate: true },
);

// More readable and better if more chart types are included in the future
const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxWidth: 0,
        boxHeight: 0,
      },
    },
  },
};

const computedChartOptions = computed(() => {
  if (props.chartType !== "bar") return baseChartOptions;

  return {
    ...baseChartOptions,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };
});
</script>
