<script setup lang="ts">
import { supportedBrands, popularVehicles } from '../../data/brands'
import BaseBadge from '../ui/BaseBadge.vue'
import { Shield, CheckCircle } from 'lucide-vue-next'

defineEmits<{
  (e: 'select-brand', brandName: string): void
}>()
</script>

<template>
  <section class="section brands-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag">
          <Shield :size="14" />
          Совместимость
        </span>
        <h2 class="section-title">
          Работаем со всеми <span class="text-gradient-primary">мировыми производителями</span>
        </h2>
        <p class="section-subtitle">
          В нашей базе заложено более 3 800 официальных тест-планов для легкового, коммерческого и тяжелого грузового дизельного автотранспорта.
        </p>
      </div>

      <!-- Brands cards -->
      <div class="brands-grid">
        <div
          v-for="brand in supportedBrands"
          :key="brand.name"
          class="brand-card card-base"
        >
          <div class="brand-card__header">
            <span class="brand-logo-txt">{{ brand.logoText }}</span>
            <span class="brand-country">{{ brand.type }}</span>
          </div>

          <p class="brand-desc">{{ brand.description }}</p>

          <div class="brand-systems">
            <span
              v-for="(sys, sIdx) in brand.systems"
              :key="sIdx"
              class="system-pill"
            >
              {{ sys }}
            </span>
          </div>
        </div>
      </div>

      <!-- Popular vehicles cloud in 33 region -->
      <div class="popular-box">
        <div class="popular-box__header">
          <h3 class="popular-box__title">Популярные автомобили в ремонте (33 регион):</h3>
          <span class="popular-box__sub">Всегда в наличии ремкомплекты и клапаны</span>
        </div>

        <div class="vehicles-cloud">
          <div
            v-for="(car, cIdx) in popularVehicles"
            :key="cIdx"
            class="vehicle-tag"
            @click="$emit('select-brand', car)"
          >
            <CheckCircle :size="14" class="car-check" />
            <span>{{ car }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.brands-section {
  background-color: var(--color-bg);
}

.brands-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  margin-bottom: 48px;
}

@media (min-width: 640px) {
  .brands-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .brands-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.brand-card {
  padding: 24px;
  display: flex;
  flex-direction: column;
}

.brand-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.brand-logo-txt {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 800;
  letter-spacing: 0.05em;
  color: var(--color-text);
}

.brand-country {
  font-size: 11px;
  color: var(--color-text-dim);
  text-transform: uppercase;
}

.brand-desc {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 18px;
  flex-grow: 1;
}

.brand-systems {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border-subtle);
}

.system-pill {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-tech);
  background: rgba(0, 210, 255, 0.08);
  border: 1px solid rgba(0, 210, 255, 0.2);
  padding: 3px 8px;
  border-radius: var(--radius-xs);
}

/* Vehicles Cloud */
.popular-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px 24px;
}

.popular-box__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 20px;
}

@media (min-width: 768px) {
  .popular-box__header {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.popular-box__title {
  font-family: var(--font-heading);
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
}

.popular-box__sub {
  font-size: 13px;
  color: var(--color-primary);
}

.vehicles-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.vehicle-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: var(--radius-sm);
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  font-size: 13px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.vehicle-tag:hover {
  background: var(--color-surface-elevated);
  border-color: var(--color-primary);
  color: var(--color-text);
  transform: translateY(-1px);
}

.car-check {
  color: var(--color-success);
  flex-shrink: 0;
}
</style>
