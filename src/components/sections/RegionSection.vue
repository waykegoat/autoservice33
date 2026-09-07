<script setup lang="ts">
import { regionCities, companyConfig } from '../../data/company'
import BaseBadge from '../ui/BaseBadge.vue'
import BaseButton from '../ui/BaseButton.vue'
import { MapPin, Navigation, Truck, Package, Clock, Phone } from 'lucide-vue-next'

defineEmits<{
  (e: 'open-booking'): void
}>()
</script>

<template>
  <section id="region33" class="section region-section">
    <div class="container">
      <div class="section-header section-header--center">
        <span class="section-tag">
          <MapPin :size="14" />
          География обслуживания
        </span>
        <h2 class="section-title">
          Работаем по всему <span class="text-gradient-primary">33 региону РФ</span>
        </h2>
        <p class="section-subtitle">
          Наш техцентр расположен во Владимире на ул. Куйбышева 26Ж прямо у федеральной трассы <strong>М-7 «Волга»</strong> с удобным заездом с <strong>М-12 «Восток»</strong>.
        </p>
      </div>

      <!-- Highway Transit Focus Banner -->
      <div class="highway-banner">
        <div class="highway-banner__content">
          <div class="highway-badges">
            <span class="road-badge road-badge--m7">М-7 ВОЛГА</span>
            <span class="road-badge road-badge--m12">М-12 ВОСТОК</span>
            <BaseBadge variant="tech">Транзитный экспресс</BaseBadge>
          </div>

          <h3 class="highway-title">
            Транзитный транспорт и дальнобойщики: ремонт без простоя
          </h3>
          <p class="highway-desc">
            Широкие ворота и просторная площадка для заезда тягачей с полуприцепами, грузовых фургонов и Газелей. Не нужно заезжать под городские знаки и стоять в пробках центра Владимира. Диагностика снятых форсунок — от 15 минут.
          </p>

          <div class="highway-features">
            <div class="highway-feat">
              <Clock :size="16" class="feat-icon text-gradient-primary" />
              <span>Срочный прием транзитных авто без очередей</span>
            </div>
            <div class="highway-feat">
              <Package :size="16" class="feat-icon text-gradient-tech" />
              <span>Обменный фонд: отдал старую — сразу поставил готовую с гарантией</span>
            </div>
          </div>
        </div>

        <div class="highway-banner__action">
          <a :href="`tel:${companyConfig.phoneRaw}`" class="highway-call-card">
            <Phone :size="24" class="call-icon" />
            <div class="call-text">
              <span class="call-label">Экстренная связь для водителей:</span>
              <span class="call-phone">{{ companyConfig.phoneDisplay }}</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Regional Cities Grid -->
      <div class="region-cities-header">
        <h3 class="region-cities-title">Прием форсунок из городов Владимирской области</h3>
        <p class="region-cities-sub">Привозите лично или передавайте курьерскими службами СДЭК / Деловые Линии / автобусом</p>
      </div>

      <div class="cities-grid">
        <div
          v-for="city in regionCities"
          :key="city.name"
          class="city-card card-base"
        >
          <div class="city-card__top">
            <div class="city-name-group">
              <MapPin :size="16" class="city-icon" />
              <h4 class="city-name">{{ city.name }}</h4>
            </div>
            <span class="city-dist">{{ city.distanceFromVladimir }}</span>
          </div>

          <div class="city-transit">
            <Navigation :size="13" class="transit-icon" />
            <span>Время в пути: <strong>{{ city.transitTime }}</strong></span>
          </div>

          <p class="city-delivery">
            {{ city.deliveryOptions }}
          </p>
        </div>
      </div>

      <!-- How remote delivery works -->
      <div class="delivery-steps-box">
        <div class="delivery-title">Как отправить форсунки в ремонт из области (3 шага):</div>
        <div class="delivery-steps">
          <div class="delivery-step">
            <span class="d-step-num">1</span>
            <div class="d-step-content">
              <strong>Снимите форсунки</strong>
              <span>Упакуйте каждую форсунку в пленку или коробку, чтобы исключить попадание грязи в штуцеры.</span>
            </div>
          </div>

          <div class="delivery-step">
            <span class="d-step-num">2</span>
            <div class="d-step-content">
              <strong>Отправьте СДЭК / ТК</strong>
              <span>Пункт выдачи во Владимире (мы встретим посылку сразу при поступлении в город).</span>
            </div>
          </div>

          <div class="delivery-step">
            <span class="d-step-num">3</span>
            <div class="d-step-content">
              <strong>Получите обратно</strong>
              <span>После стенда и видеоотчета отправляем проверенные форсунки с тест-планами и гарантией.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.region-section {
  background-color: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

/* Highway Banner */
.highway-banner {
  background: linear-gradient(135deg, #181d27 0%, #11151d 100%);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: 32px 24px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  margin-bottom: 56px;
  position: relative;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .highway-banner {
    grid-template-columns: 1fr 340px;
    padding: 40px;
    align-items: center;
  }
}

.highway-banner::after {
  content: '';
  position: absolute;
  top: -50px;
  right: -50px;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(255, 106, 26, 0.15) 0%, transparent 70%);
  pointer-events: none;
}

.highway-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.road-badge {
  font-family: var(--font-heading);
  font-size: 11px;
  font-weight: 800;
  padding: 4px 10px;
  border-radius: var(--radius-xs);
  letter-spacing: 0.05em;
}

.road-badge--m7 {
  background: #1a4d8f;
  color: #ffffff;
  border: 1px solid #2d6cc0;
}

.road-badge--m12 {
  background: #2b7a4b;
  color: #ffffff;
  border: 1px solid #3ca365;
}

.highway-title {
  font-family: var(--font-heading);
  font-size: clamp(20px, 2.5vw, 26px);
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 12px;
  line-height: 1.25;
}

.highway-desc {
  font-size: 14px;
  color: var(--color-text-muted);
  line-height: 1.6;
  margin-bottom: 24px;
  max-width: 680px;
}

.highway-features {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (min-width: 640px) {
  .highway-features {
    flex-direction: row;
    gap: 24px;
  }
}

.highway-feat {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  color: var(--color-text);
}

.feat-icon {
  flex-shrink: 0;
}

.highway-call-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 106, 26, 0.1);
  border: 1px solid rgba(255, 106, 26, 0.35);
  border-radius: var(--radius-lg);
  padding: 24px;
  text-decoration: none;
  transition: all var(--transition-base);
}

.highway-call-card:hover {
  background: rgba(255, 106, 26, 0.18);
  border-color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-glow-primary);
}

.call-icon {
  color: var(--color-primary);
  flex-shrink: 0;
}

.call-text {
  display: flex;
  flex-direction: column;
}

.call-label {
  font-size: 11px;
  color: var(--color-text-dim);
  text-transform: uppercase;
}

.call-phone {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 800;
  color: var(--color-text);
}

/* Cities Grid */
.region-cities-header {
  margin-bottom: 24px;
}

.region-cities-title {
  font-family: var(--font-heading);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 4px;
}

.region-cities-sub {
  font-size: 13px;
  color: var(--color-text-muted);
}

.cities-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  margin-bottom: 40px;
}

@media (min-width: 640px) {
  .cities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .cities-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.city-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.city-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.city-name-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.city-icon {
  color: var(--color-primary);
}

.city-name {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
}

.city-dist {
  font-size: 12px;
  font-weight: 600;
  color: var(--color-tech);
  background: rgba(0, 210, 255, 0.08);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}

.city-transit {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--color-text-dim);
  margin-bottom: 12px;
}

.transit-icon {
  color: var(--color-text-dim);
}

.city-transit strong {
  color: var(--color-text);
}

.city-delivery {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.4;
  margin-top: auto;
}

/* Delivery steps */
.delivery-steps-box {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: 28px 24px;
}

.delivery-title {
  font-family: var(--font-heading);
  font-size: 15px;
  font-weight: 700;
  color: var(--color-text);
  margin-bottom: 20px;
}

.delivery-steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 768px) {
  .delivery-steps {
    grid-template-columns: repeat(3, 1fr);
  }
}

.delivery-step {
  display: flex;
  align-items: flex-start;
  gap: 14px;
}

.d-step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--color-primary);
  color: #0b0d11;
  font-weight: 800;
  font-size: 13px;
  flex-shrink: 0;
}

.d-step-content {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.d-step-content strong {
  font-size: 14px;
  color: var(--color-text);
}

.d-step-content span {
  font-size: 12px;
  color: var(--color-text-muted);
  line-height: 1.4;
}
</style>
