<script setup lang="ts">
import { stats } from '../../data/company'
</script>

<template>
  <section class="stats">
    <div class="container stats__grid">
      <div v-for="(s, i) in stats" :key="i" class="stat">
        <span class="stat__val mono">{{ s.value }}</span>
        <span class="stat__label">{{ s.label }}</span>
        <p class="stat__sub">{{ s.subtext }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.stats {
  background: var(--surface);
  border-block: 1px solid var(--line);
}

.stats__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 42px 24px;
}

.stats__grid > * + * {
  border-left: 1px solid var(--line);
  padding-left: 24px;
}

.stat {
  display: flex;
  flex-direction: column;
}

.stat__val {
  font-family: var(--font-head);
  font-size: 2.6rem;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 6px;
}

.stat__label {
  font-family: var(--font-head);
  font-size: 1.05rem;
  text-transform: uppercase;
  color: var(--text);
  margin-bottom: 4px;
  letter-spacing: .02em;
}

.stat__sub {
  color: var(--muted);
  font-size: .86rem;
  line-height: 1.45;
}

@media (max-width: 880px) {
  .stats__grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 20px;
    padding: 34px 20px;
  }
  .stats__grid > * + * {
    border-left: none;
    padding-left: 0;
  }
}

@media (max-width: 480px) {
  .stats__grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
