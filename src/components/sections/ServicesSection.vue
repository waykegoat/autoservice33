<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue'
import BaseButton from '../ui/BaseButton.vue'
import { services } from '../../data/services'
import type { ServiceItem } from '../../types'
import { Wrench, Clock, Check, ArrowRight } from 'lucide-vue-next'

defineEmits<{
  (e: 'select-service', service: ServiceItem): void
}>()
</script>

<template>
  <section id="services" class="section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Что мы делаем</p>
        <h2 class="section-title">
          Специализированный ремонт <span class="accent">всех типов форсунок</span>
        </h2>
        <p class="section-subtitle">
          Работаем по заводским тест-планам Bosch, Delphi, Denso. Замена изношенных мультипликаторов и распылителей на оригинальные детали с микронной регулировкой.
        </p>
      </div>

      <div class="svc-grid">
        <BaseCard
          v-for="s in services"
          :key="s.id"
          interactive
          :accent="s.popular"
          class="svc"
        >
          <div class="svc__body">
            <div class="svc__top">
              <span class="svc__icon"><Wrench :size="20" /></span>
              <span v-if="s.badge" class="svc__badge">{{ s.badge }}</span>
            </div>

            <h3 class="svc__title">{{ s.title }}</h3>
            <p class="svc__summary">{{ s.summary }}</p>

            <ul class="svc__list">
              <li v-for="(point, idx) in s.included.slice(0, 3)" :key="idx">
                <Check :size="14" class="svc__check" />
                <span>{{ point }}</span>
              </li>
            </ul>

            <div class="svc__foot">
              <span class="svc__price">{{ s.priceFormatted }}</span>
              <span class="svc__time"><Clock :size="13" /> {{ s.duration }}</span>
            </div>

            <button class="svc__btn" @click="$emit('select-service', s)">
              <span>Записаться</span>
              <ArrowRight :size="15" />
            </button>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.svc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.svc {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.svc__body {
  padding: 26px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.svc__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.svc__icon {
  width: 44px;
  height: 44px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  background: var(--accent-subtle);
  color: var(--accent);
}

.svc__badge {
  font-family: var(--font-head);
  font-size: .75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .05em;
  padding: 4px 8px;
  border-radius: 4px;
  background: var(--black);
  color: #ffffff;
}

.svc__title {
  font-size: 1.25rem;
  margin-bottom: 10px;
  line-height: 1.2;
  color: var(--black);
}

.svc__summary {
  color: var(--muted);
  font-size: .92rem;
  line-height: 1.5;
  margin-bottom: 16px;
}

.svc__list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
  flex: 1;
  padding-top: 14px;
  border-top: 1px solid var(--line);
}

.svc__list li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: .84rem;
  color: var(--text);
  line-height: 1.4;
}

.svc__check {
  color: var(--accent);
  flex-shrink: 0;
  margin-top: 2px;
}

.svc__foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 14px;
  border-top: 1px solid var(--line);
  margin-top: auto;
  margin-bottom: 14px;
}

.svc__price {
  font-family: var(--font-head);
  color: var(--accent);
  font-size: 1.3rem;
  font-weight: 700;
}

.svc__time {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--dim);
  font-size: .84rem;
}

.svc__btn {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 11px 16px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: var(--radius-sm);
  color: var(--black);
  font-family: var(--font-head);
  text-transform: uppercase;
  font-size: .84rem;
  font-weight: 600;
  letter-spacing: .05em;
  transition: all .18s ease;
}

.svc__btn:hover {
  background: var(--accent);
  color: #ffffff;
  border-color: var(--accent);
}

@media (max-width: 980px) {
  .svc-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .svc-grid {
    grid-template-columns: 1fr;
  }
}
</style>
