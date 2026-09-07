<script setup lang="ts">
import { symptoms } from '../../data/symptoms'
import BaseBadge from '../ui/BaseBadge.vue'
import BaseButton from '../ui/BaseButton.vue'
import {
  Flame,
  KeyRound,
  Activity,
  Volume2,
  Fuel,
  Gauge,
  AlertTriangle,
  ArrowRight
} from 'lucide-vue-next'

defineEmits<{
  (e: 'select-symptom', symptomTitle: string): void
}>()

const iconMap: Record<string, any> = {
  Flame,
  KeyRound,
  Activity,
  Volume2,
  Fuel,
  Gauge
}
</script>

<template>
  <section id="symptoms" class="section symptoms-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag">
          <AlertTriangle :size="14" />
          Чек-лист для водителя
        </span>
        <h2 class="section-title">
          Признаки поломки <span class="text-gradient-primary">дизельных форсунок</span>
        </h2>
        <p class="section-subtitle">
          Не игнорируйте первые симптомы: переливающая форсунка смывает масляную пленку со стенок цилиндра и способна прожечь поршень за 500–1000 км пробега по трассе.
        </p>
      </div>

      <div class="symptoms-grid">
        <div
          v-for="symptom in symptoms"
          :key="symptom.id"
          class="symptom-card card-base"
        >
          <div class="symptom-card__top">
            <div class="symptom-icon-wrap" :class="`symptom-icon-wrap--${symptom.urgency}`">
              <component :is="iconMap[symptom.iconName] || AlertTriangle" :size="22" />
            </div>

            <BaseBadge
              :variant="symptom.urgency === 'critical' ? 'primary' : symptom.urgency === 'high' ? 'warning' : 'neutral'"
              :pulse="symptom.urgency === 'critical'"
            >
              {{ symptom.urgency === 'critical' ? 'Опасный симптом' : symptom.urgency === 'high' ? 'Высокий риск' : 'Повышенный износ' }}
            </BaseBadge>
          </div>

          <h3 class="symptom-title">{{ symptom.title }}</h3>
          <p class="symptom-desc">{{ symptom.description }}</p>

          <div class="symptom-consequence">
            <span class="consequence-label">Последствия:</span>
            <span class="consequence-text">{{ symptom.consequence }}</span>
          </div>

          <button
            class="symptom-btn"
            @click="$emit('select-symptom', symptom.title)"
          >
            <span>Записаться с этой проблемой</span>
            <ArrowRight :size="16" class="symptom-btn__arrow" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.symptoms-section {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.symptoms-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 640px) {
  .symptoms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .symptoms-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.symptom-card {
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.symptom-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.symptom-icon-wrap {
  width: 46px;
  height: 46px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border);
}

.symptom-icon-wrap--critical {
  color: var(--color-primary);
  background: rgba(255, 106, 26, 0.1);
  border-color: rgba(255, 106, 26, 0.3);
  box-shadow: 0 0 16px rgba(255, 106, 26, 0.2);
}

.symptom-icon-wrap--high {
  color: var(--color-warning);
  background: rgba(245, 158, 11, 0.1);
  border-color: rgba(245, 158, 11, 0.3);
}

.symptom-icon-wrap--medium {
  color: var(--color-tech);
  background: rgba(0, 210, 255, 0.1);
  border-color: rgba(0, 210, 255, 0.3);
}

.symptom-title {
  font-family: var(--font-heading);
  font-size: 17px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
  line-height: 1.3;
}

.symptom-desc {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.55;
  margin-bottom: 18px;
  flex-grow: 1;
}

.symptom-consequence {
  background-color: rgba(0, 0, 0, 0.25);
  border-left: 2px solid var(--color-primary);
  padding: 10px 12px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: 12px;
  margin-bottom: 20px;
}

.consequence-label {
  display: block;
  font-weight: 700;
  color: var(--color-primary);
  margin-bottom: 2px;
  text-transform: uppercase;
  font-size: 10px;
  letter-spacing: 0.05em;
}

.consequence-text {
  color: var(--color-text-dim);
  line-height: 1.4;
}

.symptom-btn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-top: 14px;
  border-top: 1px solid var(--color-border-subtle);
  color: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
  transition: all var(--transition-fast);
}

.symptom-btn:hover {
  color: var(--color-text);
}

.symptom-btn:hover .symptom-btn__arrow {
  transform: translateX(4px);
}

.symptom-btn__arrow {
  transition: transform var(--transition-fast);
}
</style>
