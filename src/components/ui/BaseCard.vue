<script setup lang="ts">
defineProps<{ interactive?: boolean; accent?: boolean }>()
</script>

<template>
  <div class="card" :class="{ 'card--interactive': interactive, 'card--accent': accent }">
    <slot />
  </div>
</template>

<style scoped>
.card {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  overflow: hidden;
  position: relative;
  box-shadow: var(--shadow-sm);
}

.card--interactive {
  transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease;
}

.card--interactive:hover {
  transform: translateY(-4px);
  border-color: var(--line-2);
  box-shadow: var(--shadow);
}

.card--accent::before {
  content: '';
  position: absolute;
  inset: 0 auto 0 0;
  width: 4px;
  background: var(--accent);
}
</style>
