<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue'
import { symptoms } from '../../data/symptoms'
import { AlertTriangle, ArrowRight } from 'lucide-vue-next'

defineEmits<{
  (e: 'select-symptom', symptomTitle: string): void
}>()
</script>

<template>
  <section id="symptoms" class="section">
    <div class="container">
      <div class="section-head section-head--center">
        <p class="eyebrow eyebrow--center">Самодиагностика водителя</p>
        <h2 class="section-title">
          Симптомы неисправности <span class="accent">форсунок</span>
        </h2>
        <p class="section-subtitle">
          Не игнорируйте первые признаки: переливающая форсунка смывает масляную пленку со стенок цилиндра и способна прожечь поршень за 500–1000 км пробега по трассе.
        </p>
      </div>

      <div class="symptoms-grid">
        <BaseCard
          v-for="s in symptoms"
          :key="s.id"
          interactive
          accent
          class="symp-card"
        >
          <div class="symp-body">
            <div class="symp-head">
              <span class="symp-tag" :class="`symp-tag--${s.urgency}`">
                {{ s.urgency === 'critical' ? 'Опасно' : s.urgency === 'high' ? 'Срочно' : 'Внимание' }}
              </span>
            </div>

            <h3 class="symp-title">{{ s.title }}</h3>
            <p class="symp-desc">{{ s.description }}</p>

            <div class="symp-danger">
              <span class="danger-lbl">Последствия:</span>
              <p class="danger-txt">{{ s.consequence }}</p>
            </div>

            <button
              class="symp-action"
              @click="$emit('select-symptom', s.title)"
            >
              <span>Проверить на стенде</span>
              <ArrowRight :size="15" />
            </button>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.symptoms-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.symp-card {
  display: flex;
  flex-direction: column;
}

.symp-body {
  padding: 26px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.symp-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.symp-tag {
  font-family: var(--font-head);
  font-size: .75rem;
  text-transform: uppercase;
  letter-spacing: .08em;
  padding: 2px 8px;
  border-radius: 4px;
}

.symp-tag--critical {
  background: rgba(255, 106, 26, .18);
  color: var(--accent);
  border: 1px solid rgba(255, 106, 26, .35);
}

.symp-tag--high {
  background: rgba(255, 207, 63, .14);
  color: var(--warn);
  border: 1px solid rgba(255, 207, 63, .3);
}

.symp-tag--medium {
  background: rgba(74, 148, 214, .14);
  color: var(--steel);
  border: 1px solid rgba(74, 148, 214, .3);
}

.symp-title {
  font-size: 1.25rem;
  margin-bottom: 10px;
  line-height: 1.25;
}

.symp-desc {
  color: var(--muted);
  font-size: .92rem;
  line-height: 1.5;
  margin-bottom: 18px;
  flex-grow: 1;
}

.symp-danger {
  background: var(--bg-2);
  border-left: 2px solid var(--accent);
  padding: 10px 14px;
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  margin-bottom: 20px;
}

.danger-lbl {
  font-family: var(--font-head);
  font-size: .74rem;
  text-transform: uppercase;
  letter-spacing: .06em;
  color: var(--accent);
  display: block;
  margin-bottom: 2px;
}

.danger-txt {
  font-size: .84rem;
  color: var(--text);
  line-height: 1.4;
}

.symp-action {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 14px;
  background: var(--surface-2);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  color: var(--text);
  font-family: var(--font-head);
  text-transform: uppercase;
  font-size: .82rem;
  letter-spacing: .05em;
  transition: all .16s ease;
}

.symp-action:hover {
  background: var(--accent);
  color: #10120f;
  border-color: var(--accent);
}

@media (max-width: 980px) {
  .symptoms-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .symptoms-grid {
    grid-template-columns: 1fr;
  }
}
</style>
