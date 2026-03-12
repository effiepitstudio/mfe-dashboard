<template>
  <div
    class="flex gap-1 p-0.5"
    role="radiogroup"
    aria-label="Column layout"
  >
    <button
      class="border-none rounded-sm bg-transparent text-color-muted cursor-pointer transition-all hover:text-primary"
      :class="{ 'bg-primary text-surface': columnCount === 1 }"
      role="radio"
      :aria-checked="columnCount === 1"
      aria-label="Single column layout"
      @click="$emit('update:columnCount', 1)"
    >
      <!-- https://lucide.dev/icons/square-->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-square-icon lucide-square"
      >
        <rect
          width="18"
          height="18"
          x="3"
          y="3"
          rx="2"
        />
      </svg>
    </button>
    <button
      class="border-none rounded-sm bg-transparent text-color-muted cursor-pointer transition-all hover:text-primary"
      :class="{ 'bg-primary text-surface': columnCount === 2 }"
      role="radio"
      :aria-checked="columnCount === 2"
      aria-label="Two column layout"
      @click="$emit('update:columnCount', 2)"
    >
      <!--https://lucide.dev/icons/columns-2-->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-columns2-icon lucide-columns-2"
      >
        <rect
          width="18"
          height="18"
          x="3"
          y="3"
          rx="2"
        />
        <path d="M12 3v18" />
      </svg>
    </button>
  </div>
</template>
<script setup lang="ts">
interface Props {
  columnCount: 1 | 2;
}

defineProps<Props>();

defineEmits<{
  "update:columnCount": [count: 1 | 2];
}>();
</script>
