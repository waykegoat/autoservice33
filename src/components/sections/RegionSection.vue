<script setup lang="ts">
import BaseCard from '../ui/BaseCard.vue'
import BaseButton from '../ui/BaseButton.vue'
import { regionCities, companyConfig } from '../../data/company'
import { MapPin, Navigation, Truck, Phone } from 'lucide-vue-next'

defineEmits<{
  (e: 'open-booking'): void
}>()
</script>

<template>
  <section id="region33" class="section">
    <div class="container">
      <div class="section-head">
        <p class="eyebrow">Владимирская область</p>
        <h2 class="section-title">
          Работаем по всему 33 региону <span class="accent">и транзитным трассам</span>
        </h2>
        <p class="section-subtitle">
          Сервис расположен во Владимире на ул. Куйбышева 26Ж прямо на съезде с федеральной трассы М-7 «Волга». Быстрый заезд без городских пробок.
        </p>
      </div>

      <!-- Highway Transit Banner -->
      <div class="transit-banner">
        <div class="transit-banner__content">
          <div class="roads-row">
            <span class="road-tag road-tag--m7">М-7 ВОЛГА</span>
            <span class="road-tag road-tag--m12">М-12 ВОСТОК</span>
            <span class="transit-tag">Транзитный экспресс</span>
          </div>

          <h3 class="transit-title">Для тягачей, фур и коммерческих автопарков</h3>
          <p class="transit-desc">
            Широкая площадка для маневрирования крупногабаритной техники. Не нужно стоять в заторах в центре Владимира. Экспресс-диагностика снятых форсунок от 15 минут, постоянный склад готового обменного фонда.
          </p>
        </div>

        <div class="transit-banner__side">
          <a :href="`tel:${companyConfig.phoneRaw}`" class="transit-phone-box">
            <Phone :size="20" class="accent" />
            <div>
              <span class="phone-num">{{ companyConfig.phoneDisplay }}</span>
              <span class="phone-lbl">Срочный прием с трассы</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Regional cities grid -->
      <div class="cities-head">
        <h3 class="cities-head__title">Доставка форсунок из городов области</h3>
        <span class="cities-head__sub">Принимаем снятые форсунки через СДЭК, Деловые Линии или личный привоз</span>
      </div>

      <div class="cities-grid">
        <BaseCard
          v-for="city in regionCities"
          :key="city.name"
          interactive
          class="city-card"
        >
          <div class="city-card__body">
            <div class="city-card__top">
              <div class="city-name-wrap">
                <MapPin :size="16" class="accent" />
                <h4 class="city-name">{{ city.name }}</h4>
              </div>
              <span class="city-dist mono">{{ city.distanceFromVladimir }}</span>
            </div>

            <div class="city-time">
              <Navigation :size="13" />
              <span>В пути: <strong>{{ city.transitTime }}</strong></span>
            </div>

            <p class="city-note">{{ city.deliveryOptions }}</p>
          </div>
        </BaseCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.transit-banner {
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  border-left: 4px solid var(--accent);
  padding: 36px 32px;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: center;
  margin-bottom: 54px;
}

.roads-row {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.road-tag {
  font-family: var(--font-head);
  font-size: .78rem;
  font-weight: 700;
  letter-spacing: .06em;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
}

.road-tag--m7 {
  background: #1e3a66;
  color: #ffffff;
}

.road-tag--m12 {
  background: #25663d;
  color: #ffffff;
}

.transit-tag {
  font-family: var(--font-head);
  font-size: .75rem;
  text-transform: uppercase;
  color: var(--accent);
  letter-spacing: .08em;
}

.transit-title {
  font-size: 1.45rem;
  margin-bottom: 10px;
}

.transit-desc {
  color: var(--muted);
  font-size: .94rem;
  max-width: 640px;
  line-height: 1.55;
}

.transit-phone-box {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 22px;
  background: var(--surface-2);
  border: 1px solid var(--line-2);
  border-radius: var(--radius-sm);
  text-decoration: none;
  transition: border-color .18s;
}

.transit-phone-box:hover {
  border-color: var(--accent);
}

.phone-num {
  font-family: var(--font-head);
  font-size: 1.25rem;
  color: var(--text);
  display: block;
}

.phone-lbl {
  font-size: .74rem;
  color: var(--dim);
  text-transform: uppercase;
  display: block;
  margin-top: 2px;
}

/* Cities */
.cities-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 24px;
}

.cities-head__title {
  font-size: 1.3rem;
}

.cities-head__sub {
  color: var(--muted);
  font-size: .88rem;
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.city-card__body {
  padding: 22px;
  display: flex;
  flex-direction: column;
}

.city-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.city-name-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.city-name {
  font-size: 1.12rem;
}

.city-dist {
  font-family: var(--font-head);
  font-size: .95rem;
  color: var(--accent);
}

.city-time {
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--dim);
  font-size: .84rem;
  margin-bottom: 12px;
}

.city-note {
  color: var(--muted);
  font-size: .86rem;
  line-height: 1.45;
}

@media (max-width: 980px) {
  .transit-banner {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  .cities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 620px) {
  .cities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
