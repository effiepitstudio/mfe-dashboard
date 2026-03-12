<template>
  <section
    class="visualizer-root"
    aria-label="Data Visualizer"
  >
    <header
      class="flex items-center justify-between py-1.5 sticky z-10 bg-bg"
      :style="{ top: HEADER_HEIGHT + 'px' }"
    >
      <h2 class="text-lg font-semibold text-primary">Visualizer</h2>
      <div
        class="flex items-center gap-4"
        role="toolbar"
        aria-label="Display options"
      >
        <ColumnToggle
          class="hidden sm:flex"
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
      class="text-center py-10 px-0 text-lg text-secondary"
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
        class="grid gap-6"
        :class="`columns-${columnCount}`"
      >
        <article
          class="chart-panel min-h-[600px]"
          aria-label="Chart visualizations"
        >
          <ChartDisplay
            :entries="entries"
            :chartType="chartType"
          />
        </article>
        <article
          ref="entryListRef"
          class="list-panel"
          aria-label="Entry list"
        >
          <EntryList
            v-if="showEntryList"
            :entries="sortedEntries"
          />
        </article>
        <article
          ref="statsRef"
          class="stats-panel"
          aria-label="Top 5 Statistic"
        >
          <TopFiveStats
            v-if="showStats"
            :entries="entries"
          />
        </article>
      </div>
    </Transition>
  </section>
</template>
<script setup lang="ts">
import { ref, computed, watch, defineAsyncComponent, nextTick } from "vue";
import { useEntriesSubscription } from "./composables/useEntriesSubscription";
import ColumnToggle from "./components/ColumnToggle.vue";
import ChartDisplay from "./components/ChartDisplay.vue";
import ChartTypeSwitch from "./components/ChartTypeSwitch.vue";
import type { FormEntry } from "@shared/src/types";

const HEADER_HEIGHT = 65;

const EntryList = defineAsyncComponent(
  () => import("./components/EntryList.vue"),
);

const TopFiveStats = defineAsyncComponent(
  () => import("./components/TopFiveStats.vue"),
);

const { entries } = useEntriesSubscription();

const columnCount = ref<1 | 2>(1);
const chartType = ref<"bar" | "pie">("bar");

const sortedEntries = computed<FormEntry[]>(() =>
  [...entries.value].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  ),
);

const showEntryList = ref(false);
const showStats = ref(false);

const entryListRef = ref<HTMLElement | null>(null);
const statsRef = ref<HTMLElement | null>(null);

const observer = new IntersectionObserver(
  (observerEntries) => {
    observerEntries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target === entryListRef.value) {
          showEntryList.value = true;
          observer.unobserve(entry.target);
        }

        if (entry.target === statsRef.value) {
          showStats.value = true;
          observer.unobserve(entry.target);
        }
      }
    });
  },
  {
    rootMargin: "200px",
  },
);

watch(
  () => entries.value.length,
  async (length) => {
    if (length === 0) return;

    await nextTick();

    if (entryListRef.value) observer.observe(entryListRef.value);
    if (statsRef.value) observer.observe(statsRef.value);
  },
  { immediate: true },
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

@container visualizer (max-width: 639px) {
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
