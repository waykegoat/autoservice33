<script setup lang="ts">
import { companyConfig } from '../../data/company'
import BaseButton from '../ui/BaseButton.vue'
import BaseBadge from '../ui/BaseBadge.vue'
import {
  Wrench,
  CheckCircle2,
  Gauge,
  FileSpreadsheet,
  ShieldCheck,
  ChevronRight,
  PhoneCall
} from 'lucide-vue-next'

defineEmits<{
  (e: 'open-booking', payload?: { vehicle?: string; note?: string }): void
}>()

function scrollTo(id: string) {
  const el = document.querySelector(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <section class="hero">
    <div class="container hero__inner">
      <!-- Left Content -->
      <div class="hero__content">
        <!-- Badges row -->
        <div class="hero__badges">
          <BaseBadge variant="primary">
            33 РЕГИОН • ВЛАДИМИРСКАЯ ОБЛАСТЬ
          </BaseBadge>
          <BaseBadge variant="tech" :pulse="true">
            Цифровой стенд свободен
          </BaseBadge>
        </div>

        <h1 class="hero__title">
          Ремонт и диагностика форсунок
          <span class="text-gradient-primary">Common Rail</span>
          во Владимире
        </h1>

        <p class="hero__lead">
          Проверка параметров налива и сброса в обратку на цифровом стенде за
          <strong>15 минут</strong> в вашем присутствии. Присвоение новых
          <strong>IMA/C2i кодов</strong>, устранение черного дыма и стука.
          Гарантия до <strong>12 месяцев</strong>.
        </p>

        <!-- Key bullet highlights -->
        <div class="hero__features">
          <div class="feature-item">
            <CheckCircle2 :size="18" class="feature-icon feature-icon--primary" />
            <span>Bosch, Delphi, Denso, Continental VDO, Cummins</span>
          </div>
          <div class="feature-item">
            <CheckCircle2 :size="18" class="feature-icon feature-icon--tech" />
            <span>Гидравлический демонтаж прикипевших форсунок без снятия ГБЦ</span>
          </div>
          <div class="feature-item">
            <CheckCircle2 :size="18" class="feature-icon feature-icon--primary" />
            <span>Обменный фонд: готовые форсунки на Газель, Transit, КАМАЗ в день заезда</span>
          </div>
        </div>

        <!-- Call to Actions -->
        <div class="hero__actions">
          <BaseButton
            variant="primary"
            size="lg"
            @click="scrollTo('#calculator')"
          >
            <template #icon-left>
              <Wrench :size="18" />
            </template>
            Рассчитать стоимость ремонта
          </BaseButton>

          <BaseButton
            variant="secondary"
            size="lg"
            @click="$emit('open-booking')"
          >
            <template #icon-left>
              <PhoneCall :size="18" />
            </template>
            Записаться на стенд
          </BaseButton>
        </div>

        <!-- Transit Route Note -->
        <div class="hero__route-box">
          <span class="route-pulse"></span>
          <span class="route-text">
            <strong>Съезд с трассы М-7 «Волга» (ул. Куйбышева 26Ж)</strong> — удобный заезд для фур, дальнобойщиков и коммерческого транспорта без пробок в городе.
          </span>
        </div>
      </div>

      <!-- Right Visual: Digital Bench Test Plan Mockup -->
      <div class="hero__visual">
        <div class="bench-card">
          <!-- Card Header -->
          <div class="bench-card__header">
            <div class="bench-card__status">
              <span class="status-dot"></span>
              <span class="status-title">CR-DIGITAL BENCH // 2500 BAR</span>
            </div>
            <span class="bench-card__code">№ ТП-84920</span>
          </div>

          <!-- Active Test Header -->
          <div class="bench-card__test-meta">
            <div>
              <span class="meta-label">Топливная система:</span>
              <span class="meta-val">Bosch CRI 2.2 (Cummins 2.8)</span>
            </div>
            <div class="meta-tag">Тест пройден 100%</div>
          </div>

          <!-- Parameter Graphs / Sliders -->
          <div class="bench-params">
            <div class="param-row">
              <div class="param-info">
                <span class="param-name">Предвпрыск (VE / Pre-inj)</span>
                <span class="param-num">1.8 мг/цикл <small class="text-success">(Норма 1.4-2.1)</small></span>
              </div>
              <div class="param-bar">
                <div class="param-fill" style="width: 78%;"></div>
              </div>
            </div>

            <div class="param-row">
              <div class="param-info">
                <span class="param-name">Максимальная нагрузка (VL / Full load)</span>
                <span class="param-num">52.4 мм³ <small class="text-success">(Норма 50-55)</small></span>
              </div>
              <div class="param-bar">
                <div class="param-fill" style="width: 86%;"></div>
              </div>
            </div>

            <div class="param-row">
              <div class="param-info">
                <span class="param-name">Холостой ход (LL / Idle)</span>
                <span class="param-num">5.2 мг/цикл <small class="text-success">(Норма 4.8-5.7)</small></span>
              </div>
              <div class="param-bar">
                <div class="param-fill" style="width: 70%;"></div>
              </div>
            </div>

            <div class="param-row">
              <div class="param-info">
                <span class="param-name">Слив в обратку (RL / Backleak)</span>
                <span class="param-num">18 мл/мин <small class="text-success">(Норма &lt; 35)</small></span>
              </div>
              <div class="param-bar param-bar--cyan">
                <div class="param-fill param-fill--cyan" style="width: 42%;"></div>
              </div>
            </div>
          </div>

          <!-- Generated IMA Code Badge -->
          <div class="bench-code-box">
            <div class="code-box-header">
              <span class="code-title">СГЕНЕРИРОВАННЫЙ IMA-КОД ФОРСУНКИ:</span>
              <span class="code-copy">Для прописки в ЭБУ</span>
            </div>
            <div class="code-string">B247A9-C82D10-F4E881</div>
          </div>

          <!-- Bottom Highlights -->
          <div class="bench-card__footer">
            <div class="footer-chip">
              <Gauge :size="14" class="chip-icon" />
              <span>Давление: 2500 bar</span>
            </div>
            <div class="footer-chip">
              <FileSpreadsheet :size="14" class="chip-icon" />
              <span>Протокол распечатан</span>
            </div>
            <div class="footer-chip">
              <ShieldCheck :size="14" class="chip-icon text-success" />
              <span>Гарантия 1 год</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: 130px;
  padding-bottom: 70px;
  position: relative;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .hero {
    padding-top: 150px;
    padding-bottom: 90px;
  }
}

.hero__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero__inner {
    grid-template-columns: 1.15fr 0.85fr;
    gap: 48px;
  }
}

.hero__badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.hero__title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 4.5vw, 54px);
  font-weight: 800;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin-bottom: 20px;
}

.hero__lead {
  font-size: clamp(16px, 1.8vw, 19px);
  line-height: 1.6;
  color: var(--color-text-muted);
  margin-bottom: 28px;
  max-width: 620px;
}

.hero__lead strong {
  color: var(--color-text);
}

.hero__features {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 36px;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 15px;
  color: var(--color-text);
}

.feature-icon {
  flex-shrink: 0;
}

.feature-icon--primary {
  color: var(--color-primary);
}

.feature-icon--tech {
  color: var(--color-tech);
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 32px;
}

.hero__route-box {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 106, 26, 0.06);
  border: 1px solid rgba(255, 106, 26, 0.18);
  font-size: 13px;
  color: var(--color-text-muted);
  line-height: 1.5;
  max-width: 640px;
}

.route-pulse {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-primary);
  box-shadow: 0 0 8px var(--color-primary);
  margin-top: 5px;
  flex-shrink: 0;
}

.route-text strong {
  color: var(--color-primary);
}

/* Right Bench Card Visual */
.hero__visual {
  display: flex;
  justify-content: center;
}

.bench-card {
  width: 100%;
  max-width: 480px;
  background: linear-gradient(180deg, #161b24 0%, #10141b 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(0, 210, 255, 0.08);
  position: relative;
}

.bench-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 20%;
  right: 20%;
  height: 2px;
  background: var(--color-tech-gradient);
  box-shadow: 0 0 12px var(--color-tech);
}

.bench-card__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--color-border-subtle);
}

.bench-card__status {
  display: flex;
  align-items: center;
  gap: 8px;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-tech);
  box-shadow: 0 0 8px var(--color-tech);
  animation: pulse-dot 2s infinite ease-in-out;
}

.status-title {
  font-family: var(--font-heading);
  font-size: 12px;
  font-weight: 700;
  color: var(--color-tech);
  letter-spacing: 0.06em;
}

.bench-card__code {
  font-size: 11px;
  font-family: var(--font-mono);
  color: var(--color-text-dim);
}

.bench-card__test-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.meta-label {
  display: block;
  font-size: 11px;
  color: var(--color-text-dim);
  text-transform: uppercase;
}

.meta-val {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

.meta-tag {
  font-size: 11px;
  font-weight: 700;
  color: var(--color-success);
  background: rgba(56, 211, 159, 0.12);
  border: 1px solid rgba(56, 211, 159, 0.3);
  padding: 4px 8px;
  border-radius: var(--radius-xs);
}

.bench-params {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

.param-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  margin-bottom: 6px;
}

.param-name {
  color: var(--color-text-muted);
}

.param-num {
  font-family: var(--font-mono);
  color: var(--color-text);
  font-weight: 600;
}

.param-num small {
  font-size: 10px;
  margin-left: 4px;
}

.text-success {
  color: var(--color-success);
}

.param-bar {
  width: 100%;
  height: 6px;
  background-color: var(--color-bg);
  border-radius: 3px;
  overflow: hidden;
}

.param-fill {
  height: 100%;
  background: var(--color-primary-gradient);
  border-radius: 3px;
  box-shadow: 0 0 8px rgba(255, 106, 26, 0.5);
}

.param-fill--cyan {
  background: var(--color-tech-gradient);
  box-shadow: 0 0 8px rgba(0, 210, 255, 0.5);
}

.bench-code-box {
  background: rgba(0, 0, 0, 0.4);
  border: 1px dashed var(--color-border);
  border-radius: var(--radius-md);
  padding: 12px 14px;
  margin-bottom: 20px;
}

.code-box-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 10px;
  color: var(--color-text-dim);
  letter-spacing: 0.04em;
  margin-bottom: 4px;
}

.code-copy {
  color: var(--color-tech);
}

.code-string {
  font-family: var(--font-mono);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  letter-spacing: 0.1em;
  word-break: break-all;
}

.bench-card__footer {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding-top: 14px;
  border-top: 1px solid var(--color-border-subtle);
}

.footer-chip {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--color-text-muted);
  background: var(--color-surface-elevated);
  padding: 4px 10px;
  border-radius: var(--radius-pill);
}

.chip-icon {
  color: var(--color-primary);
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
