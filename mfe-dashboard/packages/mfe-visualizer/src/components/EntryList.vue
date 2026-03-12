<template>
  <div>
    <h3 class="text-sm font-semibold mb-3 text-primary">Entries by time</h3>
    <ul
      class="list-none p-0 flex flex-col gap-2"
      role="list"
      aria-label="Entries"
    >
      <li
        v-for="entry in entries"
        :key="entry.id"
        class="py-2 px-0 border-solid border-b border-border"
        role="listitem"
      >
        <div class="flex items-center justify-between">
          <span class="font-semibold text-sm text-primary">{{
            entry.name
          }}</span>
          <time
            class="text-xs text-secondary"
            :datetime="entry.timestamp"
            >{{ formatTimestamp(entry.timestamp) }}</time
          >
        </div>
        <div class="flex gap-1 text-xs text-secondary mt-1">
          <span>{{ entry.profession }}</span>
          <span>{{ entry.height }}</span>
          <span>{{ getCountryLabel(entry.country) }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { FormEntry } from "@shared/src/types";
import { COUNTRIES } from "@shared/src/types";
import { formatTimestamp } from "@/utilities/formatTimestamp";

interface Props {
  entries: FormEntry[];
}

defineProps<Props>();

const countryMap = new Map(COUNTRIES.map((c) => [c.code, c.label]));

const getCountryLabel = (code: string): string => countryMap.get(code) ?? code;
</script>
