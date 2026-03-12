<template>
  <div>
    <h3 class="text-sm font-semibold mb-3 text-primary">
      Top 5 most common for each field
    </h3>
    <div class="flex flex-col gap-4">
      <div
        v-for="stat in topFiveStats"
        :key="stat.fieldLabel"
      >
        <h4 class="text-xs font-semibold text-color-muted uppercase mb-1">
          {{ stat.fieldLabel }}
        </h4>
        <ol
          class="list-none p-0 flex flex-col gap-1"
          :aria-label="`Top 5 ${stat.fieldLavel}`"
        >
          <li
            v-for="(item, index) in stat.items"
            :key="item.value"
            class="flex justify-start text-sm gap-1 text-primary w-full"
          >
            <span class="min-w-[24px]">{{ `${index + 1}.` }}</span>
            <span class="font-semibold flex-1 min-w-0">{{ item.value }}</span>
            <span class="text-xs opacity-80 ml-auto">{{
              `Appearances: ${item.count}`
            }}</span>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue";
import type { FormEntry } from "@shared/src/types";

import { computeTopFivePerField } from "@/utilities/statsHelpers";

interface Props {
  entries: FormEntry[];
}

const props = defineProps<Props>();

const topFiveStats = computed(() => computeTopFivePerField(props.entries));
</script>
