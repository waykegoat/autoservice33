<script setup lang="ts">
import { ref, computed } from 'vue'
import { services } from '../../data/services'
import type { ServiceItem } from '../../types'
import BaseBadge from '../ui/BaseBadge.vue'
import BaseButton from '../ui/BaseButton.vue'
import { Check, Clock, ChevronRight, Wrench, ShieldCheck } from 'lucide-vue-next'

const emit = defineEmits<{
  (e: 'select-service', service: ServiceItem): void
}>()

const activeCategory = ref<string>('all')

const categories = [
  { id: 'all', label: 'Все работы' },
  { id: 'diagnostics', label: 'Диагностика на стенде' },
  { id: 'common-rail', label: 'Common Rail (Bosch, Delphi, Denso)' },
  { id: 'piezo', label: 'Пьезофорсунки' },
  { id: 'extraction', label: 'Демонтаж прикипевших' },
  { id: 'unit-injector', label: 'Насос-форсунки (UIS/PDE)' },
  { id: 'gdi-petrol', label: 'Бензин GDI / TSI' }
]

const filteredServices = computed(() => {
  if (activeCategory.value === 'all') return services
  return services.filter((s) => s.category === activeCategory.value)
})
</script>

<template>
  <section id="services" class="section services-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag">
          <Wrench :size="14" />
          Услуги и стоимость
        </span>
        <h2 class="section-title">
          Ремонт и калибровка <span class="text-gradient-primary">всех типов форсунок</span>
        </h2>
        <p class="section-subtitle">
          Фиксированные цены без скрытых накруток. Все работы проводятся по технологическим картам производителей с распечаткой тест-плана и гарантией до 12 месяцев.
        </p>
      </div>

      <!-- Categories Filter Tabs -->
      <div class="category-filters">
        <button
          v-for="cat in categories"
          :key="cat.id"
          class="cat-pill"
          :class="{ 'cat-pill--active': activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <div
          v-for="item in filteredServices"
          :key="item.id"
          class="service-card card-base"
          :class="{ 'service-card--popular': item.popular }"
        >
          <!-- Card Top -->
          <div class="service-card__top">
            <div class="service-badges">
              <BaseBadge
                v-if="item.badge"
                :variant="item.popular ? 'primary' : 'tech'"
              >
                {{ item.badge }}
              </BaseBadge>
              <span class="service-duration">
                <Clock :size="13" />
                {{ item.duration }}
              </span>
            </div>

            <div class="service-price">
              {{ item.priceFormatted }}
            </div>
          </div>

          <h3 class="service-title">{{ item.title }}</h3>
          <p class="service-summary">{{ item.summary }}</p>

          <!-- Included items checklist -->
          <div class="service-included">
            <span class="included-title">Что входит в стоимость:</span>
            <ul class="included-list">
              <li v-for="(point, idx) in item.included" :key="idx" class="included-point">
                <Check :size="15" class="included-check" />
                <span>{{ point }}</span>
              </li>
            </ul>
          </div>

          <!-- Bottom Action -->
          <div class="service-card__bottom">
            <BaseButton
              :variant="item.popular ? 'primary' : 'secondary'"
              size="md"
              class="service-order-btn"
              @click="$emit('select-service', item)"
            >
              Записаться на ремонт
            </BaseButton>
          </div>
        </div>
      </div>

      <!-- Bottom guarantee bar -->
      <div class="services-guarantee-bar">
        <div class="guarantee-item">
          <ShieldCheck :size="24" class="guarantee-icon text-gradient-primary" />
          <div class="guarantee-text">
            <strong>12 месяцев гарантии</strong>
            <span>Официальный акт и гарантийный талон на все детали и регулировки</span>
          </div>
        </div>
        <div class="guarantee-item">
          <Clock :size="24" class="guarantee-icon text-gradient-tech" />
          <div class="guarantee-text">
            <strong>Экспресс-ремонт от 1 часа</strong>
            <span>Основной склад оригинальных клапанов и распылителей всегда в наличии</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.category-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 40px;
}

.cat-pill {
  padding: 10px 18px;
  border-radius: var(--radius-pill);
  font-size: 13px;
  font-weight: 600;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  color: var(--color-text-muted);
  transition: all var(--transition-fast);
}

.cat-pill:hover {
  border-color: var(--color-text-dim);
  color: var(--color-text);
}

.cat-pill--active {
  background: var(--color-primary-gradient);
  border-color: transparent;
  color: #ffffff;
  box-shadow: 0 4px 14px rgba(255, 106, 26, 0.35);
}

.services-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 768px) {
  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1200px) {
  .services-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.service-card {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.service-card--popular {
  border-color: rgba(255, 106, 26, 0.4);
  box-shadow: 0 8px 30px rgba(255, 106, 26, 0.08);
}

.service-card__top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.service-badges {
  display: flex;
  flex-direction: column;
  gap: 6px;
  align-items: flex-start;
}

.service-duration {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-text-dim);
}

.service-price {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 800;
  color: var(--color-primary);
  text-align: right;
  white-space: nowrap;
}

.service-title {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 10px;
  line-height: 1.3;
}

.service-summary {
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
  margin-bottom: 20px;
}

.service-included {
  background-color: var(--color-bg);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding: 14px 16px;
  margin-bottom: 24px;
  flex-grow: 1;
}

.included-title {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  color: var(--color-text-dim);
  letter-spacing: 0.05em;
  margin-bottom: 10px;
  font-weight: 600;
}

.included-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.included-point {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.4;
}

.included-check {
  color: var(--color-success);
  flex-shrink: 0;
  margin-top: 1px;
}

.service-card__bottom {
  margin-top: auto;
}

.service-order-btn {
  width: 100%;
}

/* Guarantee bar */
.services-guarantee-bar {
  margin-top: 48px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 24px 32px;
}

@media (min-width: 768px) {
  .services-guarantee-bar {
    grid-template-columns: 1fr 1fr;
  }
}

.guarantee-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.guarantee-icon {
  flex-shrink: 0;
}

.guarantee-text {
  display: flex;
  flex-direction: column;
}

.guarantee-text strong {
  font-size: 15px;
  color: var(--color-text);
  margin-bottom: 2px;
}

.guarantee-text span {
  font-size: 13px;
  color: var(--color-text-muted);
}
</style>
