<script setup lang="ts">
import BaseButton from '../ui/BaseButton.vue'
import { companyConfig } from '../../data/company'
import { Shield, Clock, Award, Phone } from 'lucide-vue-next'

defineEmits<{
  (e: 'open-booking'): void
}>()

const trust = [
  { icon: Shield, text: 'Гарантия до 12 месяцев' },
  { icon: Clock, text: 'Тест-план за 15 минут' },
  { icon: Award, text: 'Заезд с трассы М-7 «Волга»' }
]
</script>

<template>
  <section class="hero">
    <div class="hero__overlay" />
    <div class="container hero__inner">
      <p class="eyebrow">Ремонт форсунок • 33 регион • г. Владимир</p>
      
      <h1 class="hero__title">
        Диагностика и ремонт<br>форсунок <span class="accent">Common Rail</span>
      </h1>

      <p class="hero__lead">
        Высокоточная проверка на стенде за 15 минут в присутствии владельца. Ремонт систем
        Bosch, Delphi, Denso, пьезофорсунок. Присвоение новых кодов IMA/C2i.
        Гидравлическое извлечение закисших форсунок без снятия ГБЦ.
      </p>

      <div class="hero__actions">
        <BaseButton size="lg" @click="$emit('open-booking')">
          Записаться на стенд
        </BaseButton>
        <BaseButton href="#prices" variant="outline" size="lg">
          Смотреть прайс-лист
        </BaseButton>
      </div>

      <ul class="hero__trust">
        <li v-for="t in trust" :key="t.text">
          <span class="hero__trust-ic"><component :is="t.icon" :size="18" /></span>
          {{ t.text }}
        </li>
      </ul>
    </div>

    <!-- Direct phone in corner -->
    <a class="hero__phone" :href="`tel:${companyConfig.phoneRaw}`">
      <Phone :size="24" />
      <div>
        <span>{{ companyConfig.phoneDisplay }}</span>
        <em>Прямая связь с мастером</em>
      </div>
    </a>

    <!-- Subtle bottom hazard strip -->
    <div class="hero__hazard hazard" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 84vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--bg);
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 50% at 85% 40%, rgba(255, 106, 26, 0.09) 0%, transparent 70%),
    linear-gradient(90deg, rgba(13, 15, 19, 1) 0%, rgba(13, 15, 19, 0.92) 55%, rgba(13, 15, 19, 0.7) 100%);
  pointer-events: none;
}

.hero__inner {
  position: relative;
  padding: 80px 24px 90px;
  max-width: var(--container);
}

.hero__title {
  margin: 20px 0 22px;
}

.hero__lead {
  max-width: 580px;
  color: var(--muted);
  font-size: 1.15rem;
  line-height: 1.6;
}

.hero__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin: 36px 0 44px;
}

.hero__trust {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.hero__trust li {
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-head);
  text-transform: uppercase;
  font-size: .88rem;
  letter-spacing: .03em;
  color: var(--text);
}

.hero__trust-ic {
  color: var(--accent);
  display: grid;
  place-items: center;
}

.hero__phone {
  position: absolute;
  right: 32px;
  bottom: 40px;
  display: none;
  align-items: center;
  gap: 14px;
  color: var(--text);
  padding: 12px 18px;
  background: rgba(23, 27, 34, 0.85);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  backdrop-filter: blur(8px);
  transition: border-color .2s ease;
}

.hero__phone:hover {
  border-color: var(--accent);
}

.hero__phone :deep(svg) {
  color: var(--accent);
}

.hero__phone span {
  font-family: var(--font-head);
  font-size: 1.3rem;
  line-height: 1.1;
  display: block;
}

.hero__phone em {
  display: block;
  color: var(--dim);
  font-size: .74rem;
  font-style: normal;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.hero__hazard {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3px;
  opacity: 0.7;
}

@media (min-width: 1100px) {
  .hero__phone {
    display: flex;
  }
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding-top: 20px;
  }
  .hero__trust {
    gap: 16px;
  }
  .hero__lead {
    font-size: 1rem;
  }
}
</style>
