<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'tech' | 'success' | 'warning' | 'neutral'
  pulse?: boolean
}

withDefaults(defineProps<Props>(), {
  variant: 'primary',
  pulse: false
})
</script>

<template>
  <span :class="['badge', `badge--${variant}`]">
    <span v-if="pulse" class="badge__dot"></span>
    <slot />
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 600;
  border-radius: var(--radius-pill);
  line-height: 1;
  white-space: nowrap;
}

.badge--primary {
  background: rgba(255, 106, 26, 0.12);
  color: var(--color-primary);
  border: 1px solid rgba(255, 106, 26, 0.3);
}

.badge--tech {
  background: rgba(0, 210, 255, 0.12);
  color: var(--color-tech);
  border: 1px solid rgba(0, 210, 255, 0.3);
}

.badge--success {
  background: rgba(56, 211, 159, 0.12);
  color: var(--color-success);
  border: 1px solid rgba(56, 211, 159, 0.3);
}

.badge--warning {
  background: rgba(245, 158, 11, 0.12);
  color: var(--color-warning);
  border: 1px solid rgba(245, 158, 11, 0.3);
}

.badge--neutral {
  background: var(--color-surface-elevated);
  color: var(--color-text-muted);
  border: 1px solid var(--color-border);
}

.badge__dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: currentColor;
  box-shadow: 0 0 8px currentColor;
  animation: pulse-dot 1.8s infinite ease-in-out;
}

@keyframes pulse-dot {
  0%, 100% {
    transform: scale(0.9);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.3);
    opacity: 1;
  }
}
</style>
