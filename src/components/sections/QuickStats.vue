<script setup lang="ts">
import { stats } from '../../data/company'
</script>

<template>
  <section class="stats-section">
    <div class="container">
      <div class="stats-grid">
        <div
          v-for="(item, index) in stats"
          :key="index"
          class="stat-card"
        >
          <div class="stat-value text-gradient-primary">
            {{ item.value }}
          </div>
          <div class="stat-label">
            {{ item.label }}
          </div>
          <div class="stat-sub">
            {{ item.subtext }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats-section {
  padding: 20px 0 40px;
  position: relative;
  z-index: 2;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

@media (min-width: 640px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.stat-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-base), border-color var(--transition-base);
}

.stat-card:hover {
  transform: translateY(-3px);
  border-color: var(--color-border-focus);
}

.stat-value {
  font-family: var(--font-heading);
  font-size: 32px;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 8px;
  letter-spacing: -0.02em;
}

.stat-label {
  font-family: var(--font-heading);
  font-size: 14px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 6px;
}

.stat-sub {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.4;
}
</style>
