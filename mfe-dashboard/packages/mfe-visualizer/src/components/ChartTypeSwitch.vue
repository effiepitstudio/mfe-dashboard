<template>
  <div
    class="flex gap-1 p-0.5 border border-solid border-border rounded-sm"
    role="radiogroup"
    aria-label="Chart type"
  >
    <button 
        class="py-1 
        px-2 text-xs 
        border-none 
        bg-transparent 
        text-color-muted cursor-pointer transition-all hover:text-on-surface"
        :class={'font-semibold text-on-surface bg-on-surface': chartType === "bar"}
        :aria-checked="chartType === 'bar'" 
        role="radio" 
        @click="$emit('update:chartType', 'bar')"`>
            Bar
    </button>
    <button 
        class="py-1 px-2 text-xs border-none bg-transparent text-color-muted cursor-pointer transition-all hover:text-on-surface"
    
            :class="{"font-semibold text-on-surface bg-on-surface": chartType === "pie"}"
    :aria-checked="chartType === 'pie'" 
    role="radio" 
    @click="$emit('update:chartType', 'pie')"
    >Pie
</button>
  </div>
</template>
<script setup lang="ts">
interface Props {
  chartType: "bar" | "pie";
}

defineProps<Props>();

defineEmits<{
  "update:chartType": [type: "bar" | "pie"];
}>();
</script>
