<template>
  <section
    class="visualizer-root"
    aria-label="Data Visualizer"
  >
    <header class="flex items-center justify-between mb-1.5">
      <h2 class="text-lg font-semibold text-primary">Visualizer</h2>
      <div
        class="flex items-center gap-4"
        role="toolbar"
        aria-label="Display options"
      >
        <ColumnToggle
          :columnCount="columnCount"
          @update:columnCount="handleColumnCountChange"
        />
        <ChartTypeSwitch
          :chartType="chartType"
          @update:chartType="handleChartTypeChange"
        />
      </div>
    </header>

    <div
      v-if="entries.length === 0"
      class="text-center py-10 px-0 text-sm text-red-800"
      role="status"
    >
      <p>No entries yet.. Fill out the form to see data here</p>
    </div>

    <Transition
      name="layout-fade"
      mode="out-in"
    >
      <div
        v-if="entries.length > 0"
        :key="columnCount"
        class="grid gap-6"
        :class="`columns-${columnCount}`"
      >
        <article
          class="chart-panel"
          aria-label="Chart visualizations"
        >
          <ChartDisplay
            :entries="entries"
            :chartType="chartType"
          />
        </article>
        <article
          class="list-panel"
          aria-label="Entry list"
        >
          <EntryList :entries="sortedEntries" />
        </article>
        <article
          class="stats-panel"
          aria-panel="Top 5 Statistic"
        >
          <TopFiveStats :entries="entries" />
        </article>
      </div>
    </Transition>
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from "vue";
import { useEntriesSubscription } from "./composables/useEntriesSubscription";
import ColumnToggle from "./components/ColumnToggle.vue";
import ChartDisplay from "./components/ChartDisplay.vue";
import EntryList from "./components/EntryList.vue";
import TopFiveStats from "./components/TopFiveStats.vue";
import ChartTypeSwitch from "./components/ChartTypeSwitch.vue";
import type { FormEntry } from "@shared/src/types";

const { entries } = useEntriesSubscription();

const columnCount = ref<1 | 2>(1);
const chartType = ref<"bar" | "pie">("bar");

const sortedEntries = computed<FormEntry[]>(() =>
  [...entries.value].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  ),
);

const handleColumnCountChange = (count: 1 | 2): void => {
  columnCount.value = count;
};

const handleChartTypeChange = (type: "bar" | "pie"): void => {
  chartType.value = type;
};
</script>
<style lang="scss" scoped>
// Mix stylings from tailwind and scoped needs improvement, it can work only with tailwind and @apply if time allows it
.visualizer-root {
  container-type: inline-size;
  container-name: visualizer;
}

.columns-1 {
  grid-template-columns: 1fr;
}

.columns-2 {
  grid-template-columns: 1fr 1fr;
}

@container visualizer (max-width: 600px) {
  .columns-2 {
    // 2 columns become 1 in smaller screens
    grid-template-columns: 1fr;
  }
}

.chart-panel,
.list-panel,
.stats-panel {
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 6px;
}

.chart-panel {
  max-height: 400px;
  overflow-y: auto;
}

.columns-2 .chart-panel {
  grid-column: 1/ -1;
}

.layout-fade-enter-active,
.layout-fade-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.layout-fade-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.layout-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
